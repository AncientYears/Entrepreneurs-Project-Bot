const discord = require("discord.js")

module.exports.run = async (client, message, args, ecoPool) => {  
  let users = message.mentions.users.first() || message.author
  if(users.bot) return;

    ecoPool.getConnection(function(err, connection) {
        connection.query('SELECT * FROM stats', function (error, results) {
          let statsEmbed = new discord.RichEmbed()
          .setAuthor("Stats", users.displayAvatarURL)
          .setDescription(`
**Company:** ${results[0].businessName || "None Found"}
**Type:** ${results[0].businessType || "None Found"}
**Cash:** ${results[0].cash}
**Bank:** ${results[0].bank}
**Net Worth:** ${results[0].netWorth}
**Employees:** ${results[0].employees}
          `)
          .setFooter("Company owned by: " + users.username)
          message.channel.send(statsEmbed)
          connection.release();
          if (error) throw error;
        });
      });
}

module.exports.help = {
    name: "stats",
    aliases: ["statistics"]
}