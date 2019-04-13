const discord = require('discord.js');
const uptime = require(process.cwd() + '/utils/uptime.js'); // For time conversation

module.exports.run = async (client, message, args, ecoPool, stats) => {

	const collect = client.zumzaApi.harvest(ecoPool, stats);
	if(collect.status != 200) {
		if(collect.error === 'zumza-produceNotFinished') {
			if(collect.timeLeft == '-1') {
				const Embed = new discord.MessageEmbed()
					.setAuthor('Nothing in Progress!', message.author.displayAvatarURL)
					.setDescription('What do you expect to collect when nothing is produced in the first place!')
					.setFooter('Use !factory to get more Info')
					.setColor('RED');
				return message.channel.send(Embed);
			}
			else {
				const Embed = new discord.MessageEmbed()
					.setAuthor('Still Growing!', message.author.displayAvatarURL)
					.setDescription(`Your plants are still growing!\nThey will need anothter ${uptime(collect.timeLeft)}`)
					.setFooter('Use !factory to get more Info')
					.setColor('RED');
				return message.channel.send(Embed);
			}

		}

		return message.channel.send(`This command failed because of \`${collect.error}\`\n\`\`\`${require('util').inspect(collect)}\`\`\``);

		// TO-DO: Handle uncommon errors
		// planted.missing.map(x => '\n\t' + x[0] + 'x ' + x[1]).join('')}
	}

	else {
		const collectEmbed = new discord.MessageEmbed()
			.setAuthor('collected!', message.author.displayAvatarURL)
			.setDescription(`Successfully collected: **${collect.collected.map(x => '\n\t- ' + x[0] + 'x ' + x[1]).join('')} with a luck of ${require('util').inspect(collect.luck)}**!`)
			.setColor('GREEN');
		if(collect.cost) collectEmbed.addField('Cost', collect.cost.map(x => '\n\t' + x[0] + 'x ' + x[1]).join(''));
		message.channel.send(collectEmbed);
	}
};


module.exports.help = {
	name: 'collect',
	hideinhelp: false,
	requires: ['business', 'factory'],
};