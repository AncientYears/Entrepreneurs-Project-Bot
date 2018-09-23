const discord = require("discord.js")
const mysql = require("mysql")
const client = new discord.Client({disableEveryone: false})

client.on("ready", async () => {
    console.log(`${client.user.username} is up and running!`)
  })

  var ecoCon = mysql.createConnection({
    host: process.env.mysqlHost,
    user: process.env.mysqlUser,
    password: process.env.mysqlPassword,
    database: process.env.mysqlDatabase
});

ecoCon.connect(err => {
  if(err) {
  console.error(err)
  } else {
console.log("Connected to Economy Database!"); 
}
})

  client.login(process.env.TOKEN)
