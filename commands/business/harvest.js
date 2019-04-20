const discord = require('discord.js');
const uptime = require(process.cwd() + '/utils/uptime.js'); // For time conversation

module.exports.run = async (client, message, args, ecoPool, stats) => {

	const harvest = client.zumzaApi.harvest(ecoPool, stats);
	if(harvest.status != 200) {
		if(harvest.error === 'zumza-produceNotFinished') {
			if(harvest.timeLeft == '-1') {
				const Embed = new discord.MessageEmbed()
					.setAuthor('Nothing in Progress!', message.author.displayAvatarURL)
					.setDescription('What do you expect to harvest when nothing is planted in the first place!')
					.setFooter('Use !farm to get more Info')
					.setColor('RED');
				return message.channel.send(Embed);
			}
			else {
				const Embed = new discord.MessageEmbed()
					.setAuthor('Still Growing!', message.author.displayAvatarURL)
					.setDescription(`Your plants are still growing!\nThey will need anohter ${uptime(harvest.timeLeft)}`)
					.setFooter('Use !farm to get more Info')
					.setColor('RED');
				return message.channel.send(Embed);
			}

		}

		return message.channel.send(`UNHANDLED ERROR, please notify Develeopers!\nThis Command failed because of \`${harvest.error}\`\n\`\`\`${require('util').inspect(harvest)}\`\`\``);

		// TO-DO: Handle uncommon errors
		// planted.missing.map(x => '\n\t' + x[0] + 'x ' + x[1]).join('')}
	}

	else {
		const farmEmbed = new discord.MessageEmbed()
			.setAuthor('Harvested!', message.author.displayAvatarURL)
			.setDescription(`Successfully harvested: **${harvest.harvested.map(x => '\n\t- ' + x[0] + 'x ' + x[1]).join('')} with a luck of ${require('util').inspect(harvest.luck)}**!`)
			.setColor('GREEN');
		if(harvest.cost) farmEmbed.addField('Cost', harvest.cost.map(x => '\n\t' + x[0] + 'x ' + x[1]).join(''));
		message.channel.send(farmEmbed);
	}
};


module.exports.help = {
	name: 'harvest',
	hideinhelp: false,
	requires: ['business', 'embed'],
};