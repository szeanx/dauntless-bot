const Wordle = require("../../wordle");

module.exports = {
    name: "wordlestats",
    description: "Wordle stats",
    aliases: ["ws"],
    execute(message) {
        Wordle.ShowWordleStats(message);
    },
};
