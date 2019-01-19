const discord = require('discord.js');
module.exports.run = async (client, message, args, ecoPool) => {
	const users = message.mentions.users.first() || message.author;
	if (users.bot) return;
	ecoPool.query(`SELECT * FROM stats WHERE userID = '${users.id}'`, function(error, [stats]) {
		if (error) throw error;


		if (!stats.businessLocation.length) return message.reply('Sorry but **' + users.username + '** did not create their business yet!');
		const statsEmbed = new discord.RichEmbed()
			.setAuthor('Stats', users.displayAvatarURL)
			.setDescription(`
**Company:** ${stats.businessName || 'None Found'}
**Type:** ${stats.businessType || 'None Found'}
**Location:** ${stats.businessLocation || 'None Found'}
**Employees:** ${stats.employees}
**Cash:** ${stats.cash}
**Bank:** ${stats.bank}
**Net Worth:** ${stats.netWorth}
**Stocks:**
${mapstock(stats)}`)
			.setFooter('Company owned by: ' + users.username);
		message.channel.send(statsEmbed);
	});

};
module.exports.help = {
	name: 'stats',
	description: 'Check your or anothers Entrepreneurs business stats!',
	usage: '?stats or ?stats @someone ',
	aliases: ['statistics'],
	requires: ['business'],
};

function mapstock(stats) {
	let data = '';
	for(const stock in stats.stocks) { data += (`- ${stats.stocks[stock]} ${stock.replace(/_+/, ' ')} \n`);}
	if(data == '') return '- empty';
	return data;
}
/* stats.businessType === 'farm' ?
		'- **' + (stats.stocks.potato || '0') + '** potato' + '\n' +
		'- **' + (stats.stocks.potato || '0') + '** potato seeds'
		: stats.businessType === 'factory' ?
			'- **coming soon!**'

			: stats.businessType === 'shop' ?
				'- **coming soon!**'

				: message.channel.send('Error, message bot owner!')}
          */