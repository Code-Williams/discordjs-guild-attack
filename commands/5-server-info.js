// ! Iterable

const { magenta, white } = require("chalk");
const prompt = require("prompt-sync")();
const fs = require("fs");

module.exports = {
  name: "server-info",
  description: "Get information about server",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild)
      throw new Error("Insert correct guild id (Guild not found)");

    const information = {
      ID: findGuild.id || "Nothing",
      "Description ": findGuild.description || "Nothing",
      //   Icon: findGuild.icon({ dynamic: true, size: 1024 }) || "Nothing",
      Region: findGuild.region || "Nothing",
      "Member Count": findGuild.memberCount || "Nothing",
      "AFK TimeOut": findGuild.afkTimeout || "Nothing",
      "AFK Channel ID": findGuild.afkChannelID || "Nothing",
      "Verification Level": findGuild.verificationLevel || "Nothing",
      "Maximum Members": findGuild.maximumMembers || "Nothing",
      Banner: findGuild.banner || "Nothing",
      "Rules Channel ID": findGuild.rulesChannelID || "Nothing",
      "Owner ID": findGuild.ownerID || "Nothing",
    };

    for (const [i, v] of information) {
      console.log(i, v);
    }
  },
};
