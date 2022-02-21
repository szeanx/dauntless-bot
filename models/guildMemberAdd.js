const profileModel = require("../models/profileSchema");

module.exports = async (client, discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        guildID: member.guild.id,
        coins: 0,
        bank: 0,
    });
    profile.save();
};
