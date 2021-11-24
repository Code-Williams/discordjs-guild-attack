const { magenta, white } = require("chalk");
const fs = require("fs");

module.exports = {
  name: "channel",
  description: "Delete all channels",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild) throw new Error("Insert Guild ID");

    let deletedChannels = [];
    let notDeletedChannels = [];

    let deletedCount = 0;
    let notDeletedCount = 0;

    findGuild.channels.cache.forEach((channel) => {
      if (channel.deletable) {
        channel.delete().then(() => {
          console.log(
            magenta("["),
            white("*"),
            magenta(`] ${channel.id}`),
            white(" Deleted with name "),
            magenta(channel.name)
          );

          deletedChannels.push({
            name: channel.name,
            id: channel.id,
          });

          deletedCount++;
        });
      } else {
        console.log(
          magenta("["),
          white("*"),
          magenta(`] ${channel.id}`),
          white(" Not deleted with name "),
          magenta(channel.name)
        );

        notDeletedChannels.push({
          username: channel.name,
          id: channel.id,
        });

        notDeletedCount++;
      }
    });

    console.log(magenta("["), white("+"), magenta(`]`), white(" Writing log"));
    let deletedChannelsString = "";
    let notDeletedChannelsString = "";

    deletedChannels.forEach((channel) => {
      deletedChannelsString += `${channel.id} ${channel.name}\n`;
    });

    notDeletedChannels.forEach((channel) => {
      notDeletedChannelsString += `${channel.id} ${channel.name}\n`;
    });

    deletedChannelsString += `${deletedCount} Channels Deleted`;
    notDeletedChannelsString += `${notDeletedCount} Channels Not Deleted`;

    fs.writeFileSync(
      `./log/${guildID}_Channel.txt`,
      deletedChannelsString,
      "utf-8"
    );
    fs.writeFileSync(
      `./log/${guildID}_NotChannel.txt`,
      notDeletedChannelsString,
      "utf-8"
    );
  },
};
