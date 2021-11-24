const { magenta, white } = require("chalk");
const {} = require("../config.json");

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
  },
};
