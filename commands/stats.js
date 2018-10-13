const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool) => {
	const users = message.mentions.users.first() || message.author;
	if(users.bot) return;

	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${users.id}'`, function(error, results, fields) {
			if(!results.length) return message.reply('Sorry but **' + users.username + '** did not create their business yet!');
			const stockies = results[0].stocks;
			const statsEmbed = new discord.RichEmbed()
				.setAuthor('Stats', users.displayAvatarURL)
				.setDescription(`
**Company:** ${results[0].businessName || 'None Found'}
**Type:** ${results[0].businessType || 'None Found'}
**Location:** ${results[0].businessLocation || 'None Found'}
**Employees:** ${results[0].employees}
**Cash:** ${results[0].cash}
**Bank:** ${results[0].bank}
**Net Worth:** ${results[0].netWorth}
**Stocks:**
- ${stockies[1] || '0'} potatoes!
          `)
				.setFooter('Company owned by: ' + users.username);
			message.channel.send(statsEmbed);
			connection.release();
			if (error) throw error;
		});
	});
};

module.exports.help = {
	name: 'stats',
	description: 'Check your or anothers Entrepreneurs business stats!',
	usage: '?stats or ?stats @someone ',
	aliases: ['statistics'],
};