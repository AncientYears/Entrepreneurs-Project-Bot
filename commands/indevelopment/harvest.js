const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(stats.business.type !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.business.type + '**');
	if(!stats.creation.time || message.createdTimestamp <= stats.creation.time) return message.channel.send(`Your crops are not ready to harvest! \nUse the **${client.prefix}farm** command to view information about your crops`);


	const harvest = client.api.harvest(ecoPool, stats);
	if(harvest.error) {
		return message.channel.send(`This command failed because of \`${harvest.error}\`\n\`\`\`${require('util').inspect(harvest)}\`\`\``);

		// TO-DO: Fancy Error Handler
		// planted.missing.map(x => '\n\t' + x[0] + 'x ' + x[1]).join('')}
	}

	else if (harvest.status == 200) {
		// TO-DO: Fancy succesfull Handler
		const farmEmbed = new discord.RichEmbed()
			.setAuthor('Harvested!', message.author.displayAvatarURL)
			.setDescription(`Successfully harvested **${require('util').inspect(harvest.harvested)} with a luck of ${require('util').inspect(harvest.luck)}**!\nThis has cost you:\n${require('util').inspect(harvest.cost)}`)
			.setColor('GREEN');
		message.channel.send(farmEmbed);
	}
};


module.exports.help = {
	name: 'harvest',
	hideinhelp: false,
	requires: ['business', 'botowner'],
};