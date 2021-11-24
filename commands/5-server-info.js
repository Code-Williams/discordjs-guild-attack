module.exports = {
  name: "server-info",
  description: "Get information about server",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild)
      throw new Error("Insert correct guild id (Guild not found)");

    const information = [
      { name: "ID", value: findGuild.id || NaN },
      { name: "Description", value: findGuild.description || NaN },
      { name: "Member Count", value: findGuild.memberCount || NaN },
      { name: "AFK TimeOut", value: findGuild.afkTimeout || NaN },
      { name: "AFK Channel ID", value: findGuild.afkChannelID || NaN },
      {
        name: "Verification Level",
        value: findGuild.verificationLevel || NaN,
      },
      { name: "Maximum Members", value: findGuild.maximumMembers || NaN },
      { name: "Banner", value: findGuild.banner || NaN },
      {
        name: "Rules Channel ID",
        value: findGuild.rulesChannelID || NaN,
      },
      { name: "Owner ID", value: findGuild.ownerID || NaN },
    ];

    console.table(information);
  },
};
