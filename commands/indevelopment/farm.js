const discord = require('discord.js');
const uptime = require(process.cwd() + '/utils/uptime.js'); // For time conversation

module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
	const timeLeft = Number(stats.timeLength) - message.createdTimestamp;

	const farmEmbed = new discord.RichEmbed()
		.setAuthor('Farm', message.author.displayAvatarURL)
		.addField('Status', stats.creation.time == 0 ? 'Not Growing' : (message.createdTimestamp <= stats.creation.time ? `${uptime(timeLeft)} left!` : `Finished use **${client.prefix}harvest**`))
		.setDescription(`
**Crops Available**
- ${stats.stocks.potato_seeds || 'no'} potato seeds
**Useful Commands**
- ${client.prefix}plant : Plant your crops!
- ${client.prefix}harvest : Harvest your crops!
- ${client.prefix}farm : View information about your crops!
`)
		.setFooter(`Farm owned by ${message.author.tag}`);

	message.channel.send(farmEmbed);
};

module.exports.help = {
	name: 'farm',
	hideinhelp: false,
	requires: ['business'],
};