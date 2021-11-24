const { magenta, white } = require("chalk");
const config = require("./config.json");
const fs = require("fs");

module.exports = {
  check() {
    // Check user token and bot token
    // If haven't bot token and user token, take a error
    // If just haven't a token, set token to NaN
    if (config.tokens.botToken == "" && config.tokens.userToken == "")
      throw new Error("botToken and userToken in config file is clear");

    let userToken = config.tokens.userToken;
    let botToken = config.tokens.botToken;

    if (userToken == "") userToken = NaN;
    if (botToken == "") botToken = NaN;

    // Check and register all commands and events
    // Open commands dir and filter it with .js files
    let commandsCount = 0;
    let problemCommands = 0;
    let registeredCommands = 0;

    let eventsCount = 0;
    let problemEvents = 0;
    let registeredEvents = 0;

    const commandsFile = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));
    const eventsFile = fs
      .readdirSync("./events")
      .filter((file) => file.endsWith(".js"));

    // A loop for commandsFile, check commands if its have problem or not
    for (const file of commandsFile) {
      const requireCommand = require(`./commands/${file}`);
      // Command have not problem
      if (requireCommand.name && requireCommand.execute) {
        console.log(
          magenta("["),
          white("+"),
          magenta("]"),
          white(`Command `),
          magenta(requireCommand.name),
          white("Registered")
        );

        commandsCount++;
        registeredCommands++;
        // Command have problem
      } else {
        console.log(
          magenta("["),
          white("+"),
          magenta("]"),
          white("Comamnd in file"),
          magenta(file),
          white("have problem")
        );
        problemCommands++;
      }
    }
    if (commandsCount == 0)
      console.log(
        magenta("["),
        white("+"),
        magenta("]"),
        white("No commands found")
      );

    // A loop for events file, check event if its have problem or not
    for (const file of eventsFile) {
      const requireEvent = require(`./events/${file}`);
      // Command have not problem
      if (requireEvent.name && requireEvent.execute) {
        console.log(
          magenta("["),
          white("+"),
          magenta("]"),
          white(`Event `),
          magenta(requireEvent.name),
          white("Registered")
        );

        eventsCount++;
        registeredEvents++;
        // Command have problem
      } else {
        console.log(
          magenta("["),
          white("+"),
          magenta("]"),
          white("Event in file"),
          magenta(file),
          white("have problem")
        );
        problemEvents++;
      }
    }
    if (eventsCount == 0)
      console.log(
        magenta("["),
        white("+"),
        magenta("]"),
        white("No events found")
      );

    // Return all data
    return {
      commands: {
        count: commandsCount,
        problem: problemCommands,
        registered: registeredCommands,
      },

      events: {
        count: eventsCount,
        problem: problemEvents,
        registered: registeredEvents,
      },

      tokens: {
        bot: botToken,
        user: userToken,
      },
    };
  },
};
