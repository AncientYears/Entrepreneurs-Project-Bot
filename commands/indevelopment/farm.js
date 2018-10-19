const discord = require('discord.js');
const uptime = require(process.cwd() + '/utils/uptime.js'); // For time conversation

module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
	const timeLeft = new Date(Number(stats.timeLength) - message.createdTimestamp);

	const farmEmbed = new discord.RichEmbed()
		.setAuthor('Farm', message.author.displayAvatarURL)
		.addField('Status', stats.timeLength === 0 ? 'Not Growing' : (message.createdTimestamp >= stats.creation ? `${uptime(timeLeft)} left!` : 'Finished use **?harvest**'))
		.setDescription(`
**Crops Available**
- ${stats.stocks.potato || 'no'} potato

**Useful Commands**
- ?plant : Plant your crops!
- ?harvest : Harvest your crops!
- ?farm : View information about your crops!
`)
		.setFooter(`Farm owned by ${message.author.tag}`);

	message.channel.send(farmEmbed);
};

module.exports.help = {
	name: 'farm',
	hideinhelp: false,
	requires: ['business'],
};
