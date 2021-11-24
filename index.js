// Require modules and config file
const Discord = require("discord.js");
const DiscordSelf = require("discord.js-selfbot");
const config = require("./config.json");
const prompt = require("prompt-sync")();
const fs = require("fs");
const { check } = require("./functions");
const { white, magenta } = require("chalk");
let client;

// Get a check from all things
const checkAll = check();

// Register commands and events
const commands = new Discord.Collection();
const events = new Discord.Collection();

const commandsDetail = [];

const commandsDir = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith("js"));
const eventsDir = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of commandsDir) {
  const requireCommand = require(`./commands/${file}`);
  if (requireCommand.name && requireCommand.execute) {
    commands.set(requireCommand.name, requireCommand);
    commandsDetail.push({
      name: requireCommand.name,
      description: requireCommand.description,
    });
  }
}

for (const file of eventsDir) {
  const requireEvent = require(`./events/${file}`);
  if (requireEvent.name && requireEvent.execute)
    events.set(requireEvent.name, requireEvent);
}

// Create client and run bot
if (checkAll.tokens.user) {
  client = new DiscordSelf.Client();
  client.login(checkAll.tokens.user);
} else if (checkAll.tokens.bot) {
  client = new Discord.Client();
  client.login(checkAll.tokens.bot);
}

client.on("ready", () => {
  if (events.has("ready")) events.get("ready").execute(client);

  let errorText = 0;

  while (true) {
    console.clear();
    if (errorText == 1)
      console.log(
        magenta("["),
        white("-"),
        magenta("]"),
        white("Enter a correct index id")
      );
    errorText = 0;
    console.table(commandsDetail);
    console.log(
      magenta("["),
      white("+"),
      magenta("]"),
      white("Enter index ID: ")
    );
    const inputIndexID = prompt();
    let indexID;

    if (inputIndexID == "exit") break;

    try {
      indexID = parseInt(inputIndexID);
    } catch (error) {
      errorText = 1;
    }

    if (indexID >= commands.size && errorText == 0) {
      errorText = 1;
    } else {
      console.log(
        magenta("["),
        white("+"),
        magenta("]"),
        white("Enter guild id : ")
      );
      const guildId = prompt("");
      commands.get(commandsDetail[indexID].name).execute(client, guildId);
      console.log(
        magenta("["),
        white("+"),
        magenta("]"),
        white("Finished... Enter to continue")
      );
      prompt();
    }
  }
});
