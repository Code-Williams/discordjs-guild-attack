//! Message not send to users (just pending)

const { magenta, white } = require("chalk");
const { Message } = require("discord.js");
const prompt = require("prompt-sync")();
const fs = require("fs");

module.exports = {
  name: "dm",
  description: "Send message to all users in target guild",
  execute(client, guildID) {
    const findGuild = client.guilds.cache.get(guildID);
    if (!findGuild) throw new Error("Insert Guild ID [Cna't find guild]");

    console.log(
      magenta("["),
      white("*"),
      magenta(`]`),
      white("Enter text you want to send : ")
    );
    const text = prompt();

    let sentMessages = [];
    let notSendMessage = [];

    let sentMessagesCounter = 0;
    let notSendMessageCounter = 0;

    findGuild.members.cache.forEach((user) => {
      const findUser = client.users.cache.get(user.id);
      if (findUser && !findUser.bot) {
        findUser
          .send(text)
          .then(() => console.log("Message Sent"))
          .catch(() => console.log("message not send"));
        console.log(`Message sent to ${user.user.username}`);
      }
    });
  },
};
