const { magenta, white } = require("chalk");

module.exports = {
  name: "create-role",
  description: "Create unlimited roles",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild)
      throw new Error("Insert correct guild id (can't find guild)");

    console.log(magenta("["), white("*"), magenta(`]`), white(" Role Name : "));

    while (true) {
      findGuild.roles.create("Willi Team").then((role) => {
        console.log(
          magenta("["),
          white("*"),
          magenta(`]`),
          white("New role created with id "),
          magenta(role.id)
        );
      });
    }
  },
};
