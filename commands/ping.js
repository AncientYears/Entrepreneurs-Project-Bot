const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    let pingEmbed = new discord.RichEmbed()
    .setAuthor("Bot Latency", bot.user.avatarURL)
    .addField("Ping", bot.ping)
}

module.exports.help = {
    name: "ping"
}