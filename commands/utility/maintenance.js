const Discord = require("discord.js");

module.exports = {
    name: "maintenance",
    description: "Maintenance mode",
    usage: "maintenance",
    aliases: ["maint"],
    execute(message) {
        if (message.author.id == "832231777610629123") {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle("Maintenance mode")
                    .setColor("#FF0000")
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL(),
                    )
                    .setDescription("Maintenance mode! Shutting down...")
                    .setFooter(
                        `Requested by ${message.author.username}#${message.author.discriminator}`,
                    )
                    .setTimestamp(),
            );
        } else {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle("Maintenance mode")
                    .setColor("#FF0000")
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL(),
                    )
                    .setDescription(
                        "You don't have permission to use this command! Only sean can do this!",
                    )
                    .setFooter(
                        `Requested by ${message.author.username}#${message.author.discriminator}`,
                    )
                    .setTimestamp(),
            );
        }
    },
};
