const { magenta, white } = require("chalk");
const fs = require("fs");

module.exports = {
  name: "channel",
  description: "Delete all channels",
  execute(client, guildID) {
    const guild = client.guilds.cache.get(guildID);
    if (!guild) throw new Error("Insert Guild ID");

    guild.channels.cache.forEach((channel) => {
      if (channel.deletable) {
        channel.delete().then(() => {
          console.log(
            magenta("["),
            white("*"),
            magenta(`] ${channel.id}`),
            white(" Deleted with name "),
            magenta(channel.name)
          );
        });
      } else {
        console.log(
          magenta("["),
          white("*"),
          magenta(`] ${channel.id}`),
          white(" Not deleted with name "),
          magenta(channel.name)
        );
      }
    });
  },
};
