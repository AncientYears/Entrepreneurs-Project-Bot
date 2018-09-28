const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool) => {
	const users = message.mentions.users.first() || message.author;
	if(users.bot) return;

	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = ${message.author.id}`, function(error, results, fields) {
			const statsEmbed = new discord.RichEmbed()
				.setAuthor('Stats', users.displayAvatarURL)
				.setDescription(`
**Company:** ${results[0].businessName || 'None Found'}
**Type:** ${results[0].businessType || 'None Found'}
**Cash:** ${results[0].cash}
**Bank:** ${results[0].bank}
**Net Worth:** ${results[0].netWorth}
**Employees:** ${results[0].employees}
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