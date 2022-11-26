require("./botconfig/keepAlive")();
const { Client, Collection } = require('discord.js');
const chalk = require("chalk");
const data = require('croxydb');
const fs = require('fs')
const client = new Client();
client.commands = new Collection();
client.db = data;
require('discord-buttons')(client);

const MessageMenu = require("discord-buttons")
client.on('ready', () => {
  console.log(chalk.bold.red(`Logged In As ${client.user.tag}\n\n`));

  console.log(chalk.bold.italic.blue(`MaxGamer Ocdez`));

  client.user.setActivity(process.env.PREFIX + 'help | GIVEAWAY', { type: "LISTENING" }).catch(console.error)
})

client.on('message', (message) => {
  let prefix = process.env.PREFIX;
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;
  cmd.run(client, message, args);
});

fs.readdir('./cmds/', (err, files) => {
  if (err) console.error(err);
  files.forEach(f => {
    let cmd = require(`./cmds/${f}`);
      client.commands.set(cmd.name, cmd);
  });
});

client.login(process.env.TOKEN);

// require("http").createServer((req, res) => res.end("Put This Link In Uptimerobot ↑")).listen(process.env.PORT || 8080)


// Code By MaxGamer

// Code Designed By DEV x R J
