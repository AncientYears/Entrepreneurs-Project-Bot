const discord = require("discord.js")
const client = new discord.Client({disableEveryone: false})

client.on("ready", async () => {
    console.log(`${client.user.username} is up and running!`)
  })
