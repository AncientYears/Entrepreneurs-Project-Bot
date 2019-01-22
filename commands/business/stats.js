const discord = require('discord.js');
module.exports.run = async (client, message, args, ecoPool) => {
	const users = message.mentions.users.first() || message.author;
	let [[stats]] = await ecoPool.query(`SELECT * FROM stats WHERE userID = '${users.id}'`);
	stats = client.api.parseStats(stats).data;
	if (!stats.businessLocation || !stats.businessLocation.length) return message.reply('Sorry but **' + users.username + '** did not create their business yet!');

	const statsEmbed = new discord.RichEmbed()
		.setAuthor('Stats', users.displayAvatarURL)
		.setDescription(`
						**Company:** ${stats.businessName}
						**Type:** ${stats.businessType}
						**Location:** ${stats.businessLocation}
						**Employees:** ${stats.employees} 
						**Cash:** ${stats.cash}
						**Bank:** ${stats.bank}
						**Net Worth:** ${stats.netWorth}
						**Stocks:**
${mapstock(stats) }`)
		.setFooter('Company owned by: ' + users.username);
	message.channel.send(statsEmbed);
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