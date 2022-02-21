const Discord = require("discord.js");

module.exports = {
    name: "balance",
    description: "Check your balance",
    aliases: ["bal", "money", "balance"],
    execute(message, profileData) {
        if (profileData.coins <= 10 || profileData.bank <= 10) {
            message.channel.send(
                new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setAuthor(
                        message.author.username,
                        message.author.avatarURL(),
                    )
                    .setDescription(
                        `dude you're broke just save up loser. you have \`${profileData.coins}\` sgd in your broke ass wallet and \`${profileData.bank}\` sgd in your bank.`,
                    )
                    .setFooter(
                        `Requested by ${message.author.username}#${message.author.discriminator}`,
                    )
                    .setTimestamp(),
            );
        }
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("Balance")
                .setColor(
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                )
                .setAuthor(message.author.username, message.author.avatarURL())
                .setDescription(
                    `You have **${profileData.coins}**SGD in your wallet.\nYou have **${profileData.coins}**SGD in your bank account.`,
                )
                .setFooter(
                    `Requested by ${message.author.username}#${message.author.discriminator}`,
                )
                .setTimestamp(),
        );
    },
};
