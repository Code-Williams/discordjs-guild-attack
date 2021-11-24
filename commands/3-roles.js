const { magenta, white } = require("chalk");
const fs = require("fs");

module.exports = {
  name: "roles",
  description: "Delete all roles",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild) throw new Error("Insert Guild ID");

    let deletedRoles = [];

    let deletedCount = 0;

    findGuild.roles.cache.forEach((role) => {
      try {
        role.delete().then(() => {
          console.log(
            magenta("["),
            white("*"),
            magenta(`] ${role.id}`),
            white(" Role deleted with name "),
            magenta(role.name)
          );

          deletedRoles.push({
            name: role.name,
            id: role.id,
          });

          deletedCount++;
        });
      } catch {}
    });

    console.log(magenta("["), white("+"), magenta(`]`), white(" Writing log"));
    let deletedRolesString = "";

    deletedRoles.forEach((role) => {
      deletedRolesString += `${role.id} ${role.name}\n`;
    });

    deletedRolesString += `${deletedCount} Roles Deleted`;

    fs.writeFileSync(`./log/${guildID}_Role.txt`, deletedRolesString, "utf-8");
  },
};
