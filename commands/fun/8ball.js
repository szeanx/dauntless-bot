const Discord = require("discord.js");

module.exports = {
    name: "8ball",
    description: "Ask the magic 8ball a question!",
    execute(message, args) {
        const responses = [
            "It is certain.",
            "It is decidedly so.",
            "Without a doubt.",
            "Yes, definitely.",
            "You may rely on it.",
            "As I see it, yes.",
            "Most likely.",
            "Nah bro.",
            "I don't think so.",
            "u kinda weird why would u ask that???",
            "Very doubtful.",
            "Ehh not really",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "Go ask Jesus bro",
            "My reply is no",
        ];
        const response =
            responses[Math.floor(Math.random() * responses.length)];
        if (!args[1]) {
            return message.channel.send(
                new Discord.MessageEmbed()

                    .setColor("#FF0000")
                    .setAuthor(
                        "Dauntless Bot",
                        "https://i.ibb.co/rHVML5q/Untitled-design.png",
                    )
                    .setDescription(
                        `You didn't ask a question!\nUsage: \`d!8ball <question>\``,
                    ),
            );
        }
        message.channel.send(
            new Discord.MessageEmbed()
                .setColor(
                    "#" + Math.floor(Math.random() * 16777215).toString(16),
                )
                // embed bot avatar
                .setAuthor(
                    "Dauntless Bot",
                    "https://i.ibb.co/rHVML5q/Untitled-design.png",
                )

                .setDescription(`${response}`),
        );
    },
};
