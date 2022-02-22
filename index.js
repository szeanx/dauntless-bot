const Discord = require("discord.js");
const Levels = require("discord-xp");
const client = new Discord.Client();
const profileModel = require("./models/profileSchema");
require("dotenv").config();
const fs = require("fs");

client.commands = new Discord.Collection();

fs.readdirSync("./commands/").forEach((dir) => {
    const files = fs
        .readdirSync(`./commands/${dir}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of files) {
        const command = require(`./commands/${dir}/${file}`);
        client.commands.set(command.name, command);
    }
});

const functions = fs
    .readdirSync("./functions/")
    .filter((file) => file.endsWith(".js"));

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setPresence({
        status: "online",
        activity: {
            name: "with Jesus",
            type: "PLAYING",
        },
    });
});

Levels.setURL(process.env.MONGO_URI);
const prefix = "d!";

client.on("message", async function (message) {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    // schema creation
    var profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                guildID: message.guild.id,
                coins: 0,
                bank: 0,
            });
            profile.save();
        }
    } catch (err) {
        console.log(err);
    }

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const commandName = args.shift().toLowerCase();
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (command) =>
                command.aliases && command.aliases.includes(commandName),
        );

    if (!command)
        return message.channel.send(
            new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(`\`${commandName}\` doesn't exist!`)
                .setFooter(
                    `Requested by ${message.author.username}#${message.author.discriminator}`,
                )
                .setTimestamp(),
        );

    try {
        command.execute(message, args);
    } catch (err) {
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor("#FF0000")
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(`No permission for \`${commandName}\``)
                .setFooter(
                    `Requested by ${message.author.username}#${message.author.discriminator}`,
                )
                .setTimestamp(),
        );
    }

    //exp
    const randomXP = Math.floor(Math.random() * 10) + 1; //1-11
    const hasLeveledUp = await Levels.appendXp(
        message.author.id,
        message.guild.id,
        randomXP,
    );
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor(
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                )
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(`You leveled up to level ${user.level}!`),
        );
    }
});

client.login(process.env.TOKEN);

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.dbLogin();
})();
