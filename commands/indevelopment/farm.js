const discord = require('discord.js');
const uptime = require(process.cwd() + '/utils/uptime.js'); // For time conversation

module.exports.run = async (client, message, args, ecoPool, stats) => {
	const timeLeft = Number(stats.creation.time) - message.createdTimestamp;

	const farmEmbed = new discord.RichEmbed()
		.setAuthor('Farm', message.author.displayAvatarURL)
		.addField('Status', stats.creation.time == undefined ? 'Not Growing' : (message.createdTimestamp <= stats.creation.time ? `${uptime(timeLeft)} left!\n${statusbar(stats)}` : `Finished use **${client.prefix}harvest**`))
		.setDescription(`
**Crops Available**
- ${stats.stocks.potato || 'no'} potatoes | 1h grow time
- ${stats.stocks.carrot_seeds || 'no'} carrot seeds | 3h grow time
- ${stats.stocks.corn_seeds || 'no'} corn seeds | 5h grow time
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
	usage: '<prefix>farm',
	aliases: ['crops'],
	requires: ['business', 'farm'],
};

function statusbar(stats) {
	const percent = Number(((stats.creation.time - Date.now()) / (stats.creation.time - stats.creation.started) * -100) + 100);
	let str = '[';
	for (let i = 1; i < 10; i++) {
		if(percent > i * 10) str += '▓';
		else str += '░';
	}
	str += '] ' + percent.toFixed(0) + '%';
	return str;

}