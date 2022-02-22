const Discord = require("discord.js");

module.exports = {
    name: "prayerpointer",
    description: "Add prayer pointers to the channel",
    aliases: ["pp"],
    execute(message, args) {
        const channel = message.guild.channels.cache.find(
            (c) => c.name === "🔥prayer-pointer",
        );
        if (!channel)
            return message.channel.send(
                "There is no channel called `🔥prayer-pointer`",
            );
        if (!args[0])
            return message.channel.send(
                `<@${message.author.id}>`,
                new Discord.MessageEmbed()
                    .setTitle("???")
                    .setDescription(
                        "Please provide a prayer pointer to add to the channel",
                    )
                    .setColor("#FF0000")
                    .setFooter("Prayer")
                    .setTimestamp(),
            );

        let messageArgs = args.join(" ");
        channel
            .send(`${message.author} added a prayer pointer: ${messageArgs}`)
            .then((msg) => {
                msg.react("✅");
                msg.react("❌");
            });
    },
};
