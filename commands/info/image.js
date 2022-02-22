const Scraper = require("images-scraper");
const Discord = require("discord.js");

const google = new Scraper({
    puppeteer: {
        headless: true,
    },
});

module.exports = {
    name: "image",
    aliases: ["img", "i"],
    description: "Get an image from the internet",
    async execute(message, args) {
        const image_query = args.join(" ");
        if (!image_query)
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setDescription("Please provide a search query")
                    .setColor("#FF0000")
                    .setFooter("Image")
                    .setTimestamp(),
            );

        const image_results = await google.scrape(image_query, 1);
        message.channel.send(image_results[0].url);
    },
};
