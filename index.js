const discord = require("discord.js")
const fs = require("fs")
const mysql = require("mysql")
const client = new discord.Client({disableEveryone: false})
var commands = new discord.Collection()

client.on("ready", async () => {
    console.log(`${client.user.username} is up and running!`)
  })

client.on("message", async (message, cmdFiles) => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let commandNoPrefix = command.substr(1)
  let args = messageArray.slice(1);
  var prefix = "?" // temporary prefix here

  if (message.content.toLowerCase == "hello") return message.channel.send("Hi there!")

  if(!command.startsWith(prefix)) return;

  let cmd = commands.get(command.slice(prefix.length).toLowerCase())  
  
  if(cmd) {
  cmd.run(client, message, args)
  }

})

fs.readdir("./commands/", (err, files) => {
  if(err) confirm.error(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
      console.log("No commands to load!");
      return;
  }
  console.log(`Loading ${jsfiles.length} commands...`);

  jsfiles.forEach((f, i) => {
      let cmdFiles = require(`./commands/${f}`);
      commands.set(cmdFiles.help.name, cmdFiles);
  });
})

  var ecoPool = mysql.createPool({
    host: process.env.mysqlHost,
    user: process.env.mysqlUser,
    password: process.env.mysqlPassword,
    database: process.env.mysqlDatabase
});

  client.login(process.env.TOKEN)
