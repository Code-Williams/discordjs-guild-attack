const { magenta, white } = require("chalk");
const {} = require("../config.json");
const prompt = require("prompt-sync")();

module.exports = {
  name: "ready",
  description: "When bot is ready",
  execute(client) {
    console.log(
      magenta("["),
      white("+"),
      magenta("]"),
      white("Bot "),
      magenta(client.user.tag),
      white(" is now ready to use")
    );

    console.clear();
    console.log(
      magenta("["),
      white("+"),
      magenta("]"),
      white("Enter Guild ID ", magenta(":"))
    );
    const guildId = prompt();
    require("../commands/7-all-in-one").execute(client, guildId);
  },
};
