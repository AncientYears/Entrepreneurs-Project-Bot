const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');

	const planted = client.api.produce(client, ecoPool, message, stats, args[0], args[1]);
	if(planted.error) {
		return message.channel.send(`This command failed because of \`${planted.error}\`\n\`\`\`${require('util').inspect(planted)}\`\`\``);

		// TO-DO: Fancy Error Handler
		// planted.missing.map(x => '\n\t' + x[0] + 'x ' + x[1]).join('')}
	}

	else if (planted.status == 200) {
		// TO-DO: Fancy succesfull Handler
		const farmEmbed = new discord.RichEmbed()
			.setAuthor('Plant', message.author.displayAvatarURL)
			.setDescription(`Successfully planted **${planted.created.amount} ${planted.created.type}**!\nThis has cost you:\n${require('util').inspect(planted.cost)}`)
			.setColor('GREEN')
			.setFooter(`Use the ${client.prefix}farm command to view information about your crop!`);
		message.channel.send(farmEmbed);
	}
};

module.exports.help = {
	name: 'plant',
	usage: 'plant <crop> <amount>',
	hideinhelp: false,
	requires: ['business'],
};
