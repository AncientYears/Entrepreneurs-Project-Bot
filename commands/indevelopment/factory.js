const discord = require('discord.js');
const uptime = require(process.cwd() + '/utils/uptime.js'); // For time conversation

module.exports.run = async (client, message, args, ecoPool, stats) => {
	const timeLeft = Number(stats.creation.time) - message.createdTimestamp;

	const factoryEmbed = new discord.RichEmbed()
		.setAuthor('Factory', message.author.displayAvatarURL)
		.addField('Status', stats.creation.time == undefined ? 'Not Fabricating' : (message.createdTimestamp <= stats.creation.time ? `${uptime(timeLeft)} left!\n${statusbar(stats)}` : `Finished use **${client.prefix}collect**`))
		.setDescription(`\`\`\`
	  Available		|   time needed	  |   cost
- popcorn			  | 1h work time	   | 2x corn
- chips				| 30min work time	| 2x potato
- nutrient_paste | 2h work time | 1x carrot; 2x corn; 5x potato
\`\`\`
**Useful Commands**
- ${client.prefix}fabricate : Fabricate stuff!
- ${client.prefix}collect : When finished collect fabricated items!
- ${client.prefix}factory : View information about your factory!
`)

		.setFooter(`Factory owned by ${message.author.tag}`);

	message.channel.send(factoryEmbed);
};

module.exports.help = {
	name: 'factory',
	hideinhelp: false,
	usage: '<prefix>factory',
	requires: ['business', 'factory'],
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