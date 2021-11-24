const { magenta, white } = require("chalk");
const prompt = require("prompt-sync")();

module.exports = {
  name: "create-channel",
  description: "Create unlimited channels",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild)
      throw new Error("Insert a correct guild ID (Can't find guild)");

    console.log(
      magenta("["),
      white("*"),
      magenta(`]`, white("Channel name : "))
    );

    const channelName = prompt();

    while (true) {
      findGuild.channels.create(channelName).then((channel) => {
        console.log(
          magenta("["),
          white("*"),
          magenta(
            `]`,
            white("New channel created with id "),
            magenta(channel.id)
          )
        );
      });
    }
  },
};
