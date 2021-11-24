const { white, magenta } = require("chalk");
const fs = require("fs");

module.exports = {
  name: "ban",
  description: "Ban all members",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild) throw new Error("Insert Guild ID");

    let bannedUsers = [];
    let notBannedUsers = [];

    let bannedMembers = 0;
    let notBannedMembers = 0;

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

          bannedUsers.push({
            tag: member.user.tag,
            id: member.id,
          });

          bannedMembers++;
        });
      } else {
        console.log(
          magenta("["),
          white("*"),
          magenta(`] ${member.id}`),
          white(" Not banned with username "),
          magenta(member.user.tag)
        );

        notBannedUsers.push({
          tag: member.user.tag,
          id: member.id,
        });

        notBannedMembers++;
      }
    });

    console.log(magenta("["), white("+"), magenta(`]`), white(" Writing log"));
    let bannedUsersString = "";
    let notBannedUsersString = "";

    bannedUsers.forEach((user) => {
      bannedUsersString += `${user.id} ${user.tag}\n`;
    });

    notBannedUsers.forEach((user) => {
      notBannedUsersString += `${user.id} ${user.tag}\n`;
    });

    bannedUsersString += `${bannedMembers} Members banned`;
    notBannedUsersString += `${notBannedMembers} Members not banned`;

    fs.writeFileSync(`./log/${guildID}_Ban.txt`, bannedUsersString, "utf-8");
    fs.writeFileSync(
      `./log/${guildID}_NotBan.txt`,
      notBannedUsersString,
      "utf-8"
    );
  },
};
