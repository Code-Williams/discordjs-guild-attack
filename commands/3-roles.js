const { magenta, white } = require("chalk");
const fs = require("fs");

module.exports = {
  name: "roles",
  description: "Delete all roles",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild) throw new Error("Insert Guild ID");

    findGuild.roles.cache.forEach((role) => {
      try {
        role
          .delete()
          .then(() => {
            console.log(
              magenta("["),
              white("*"),
              magenta(`] ${role.id}`),
              white(" Role deleted with name "),
              magenta(role.name)
            );
          })
          .catch(() => {});
      } catch {}
    });
  },
};
