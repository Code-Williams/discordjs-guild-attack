const { white, magenta } = require("chalk");
const fs = require("fs");

module.exports = {
  name: "ban",
  description: "Ban all members",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild) throw new Error("Insert Guild ID");

    findGuild.members.cache.forEach((member) => {
      if (member.bannable) {
        member.ban().then(() => {
          console.log(
            magenta("["),
            white("*"),
            magenta(`] ${member.id}`),
            white(" Banned with username "),
            magenta(member.user.tag)
          );
        });
      } else {
        console.log(
          magenta("["),
          white("*"),
          magenta(`] ${member.id}`),
          white(" Not banned with username "),
          magenta(member.user.tag)
        );
      }
    });
  },
};
