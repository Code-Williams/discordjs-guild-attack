const ban = require("./1-ban");
const channel = require("./2-channel");
const role = require("./3-roles");
const createChannel = require("./6-create-channel");
const createRole = require("./6-create-role");

module.exports = {
  name: "all-in-one",
  description: "Run all things",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild)
      throw new Error("Insert correct guild id (Can't find guild)");

    channel.execute(client, guildID);
    ban.execute(client, guildID);
    role.execute(client, guildID);

    setTimeout(() => {
      createChannel.execute(client, guildID);
      createRole.execute(client.guildID);
    }, 10000);
  },
};
