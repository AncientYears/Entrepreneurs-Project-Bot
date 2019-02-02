const discord = require('discord.js');
module.exports.run = async (client, message, args, ecoPool, stats) => {
	const users = message.mentions.users.first() || message.author;
	if(message.author.id != users.id) stats = await client.api.getStats(users.id, ecoPool).then(data => data.data);
	if (!stats.business.location || !stats.business.location.length) return message.reply('Sorry but **' + users.username + '** did not create their business yet!');

	const statsEmbed = new discord.RichEmbed()
		.setAuthor('Stats', users.displayAvatarURL)
		.setDescription(`
						**Company:** ${stats.business.name}
						**Type:** ${stats.business.type}
						**Location:** ${stats.business.location}
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
	usage: '<prefix>stats or <prefix>stats <mention> ',
	aliases: ['statistics'],
	requires: ['business'],
};

function mapstock(stats) {
	let data = '';
	for(const stock in stats.stocks) { data += (`- ${stats.stocks[stock]} ${stock.replace(/_+/, ' ')} \n`);}
	if(data == '') return '- empty';
	return data;
}