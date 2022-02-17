const Wordle = require("../../wordle");

module.exports = {
    name: "guess",
    description: "Guess the wordle",
    aliases: ["g"],
    execute(message) {
        Wordle.PlayWordle(message);
    },
};
