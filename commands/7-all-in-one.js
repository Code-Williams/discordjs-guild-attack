const ban = require("./1-ban");
const channel = require("./2-channel");
const role = require("./3-roles");

module.exports = {
  name: "all-in-one",
  description: "Run all things",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild)
      throw new Error("Insert correct guild id (Can't find guild)");

    while (true) {
      ban.execute(client, guildID);
      channel.execute(client, guildID);
      role.execute(client, guildID);
    }
  },
};
