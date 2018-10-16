const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
	const timeLeftStamp = message.createdTimestamp - stats.timeLength ;
	const timeLeft = new Date(timeLeftStamp);

	const farmEmbed = new discord.RichEmbed()
		.setAuthor('Farm', message.author.displayAvatarURL)
		.addField('Status', stats.timeLength !== 0 ? 'Not Growing' : `${timeLeft.getHours()}h ${timeLeft.getMinutes()}m ${timeLeft.getSeconds()}s`)
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
};
