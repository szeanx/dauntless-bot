const Levels = require("discord-xp");
const Discord = require("discord.js");

module.exports = {
    name: "leaderboard",
    aliases: ["lb"],
    description: "Check the leaderboard",
    async execute(message, client) {
        const rawLeaderboard = await Levels.fetchLeaderboard(
            message.guild.id,
            10,
        );

        try {
            const leaderboard = await Levels.computeLeaderboard(
                client,
                rawLeaderboard,
                true,
            );
            const lb = leaderboard.map(
                (e) =>
                    `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${
                        e.level
                    }\nXP: ${e.xp.toLocaleString()}`,
            );
            message.channel.send(
                new Discord.MessageEmbed()
                    .setColor(
                        "#" + Math.floor(Math.random() * 16777215).toString(16),
                    )
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL(),
                    )
                    .setDescription(`**Leaderboad**\n\n${lb.join("\n\n")}`),
            );
        } catch (err) {
            console.log(err);
        }
    },
};
