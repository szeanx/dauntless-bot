const Wordle = require("../../wordle");

module.exports = {
    name: "playwordle",
    description: "Play Wordle!",
    aliases: ["pw"],
    execute(message) {
        Wordle.LoadNewWordle(message);
    },
};
