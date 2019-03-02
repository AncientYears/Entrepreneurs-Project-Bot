const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(stats.business.type !== 'factory') return message.channel.send('Sorry, you do not have a factory! \nYou have a **' + stats.business.type + '**');
	const fabricated = client.api.produce(ecoPool, stats, args[0], args[1]);
	if(fabricated.error || fabricated.status !== 200) {
		if(fabricated.error === 'zumza-alreadyProducing') {
			const Embed = new discord.RichEmbed()
				.setAuthor('You are already doing something. Get back here!!', message.author.displayAvatarURL)
				.setDescription(`You should be currently looking after your **${fabricated.stats.creation.type}**!`)
				.setColor('RED');
			return message.channel.send(Embed);
		}
		if(fabricated.error === 'zumza-businessTypeNotValid') {
			const Embed = new discord.RichEmbed()
				.setAuthor('Thats not your business!', message.author.displayAvatarURL)
				.setDescription(`These Business-types are able to do that job:\n${fabricated.ableTypes.join('\n')}`)
				.setColor('RED');
			return message.channel.send(Embed);
		}
		if(fabricated.error === 'zumza-notEnoughMaterial') {
			const Embed = new discord.RichEmbed()
				.setAuthor('Let\'s go shopping!', message.author.displayAvatarURL)
				.setDescription(`We are missing some stuff:${fabricated.missing.map(x => '\n\t' + x[0] + 'x ' + x[1]).join('')}`)
				.setColor('RED');
			return message.channel.send(Embed);
		}
		// TO-DO: Handle Uncommon Errors
		return message.channel.send(`This command failed because of \`${fabricated.error}\`\n\`\`\`${require('util').inspect(fabricated)}\`\`\``);
	}

	else {
		const farmEmbed = new discord.RichEmbed()
			.setAuthor('Plant', message.author.displayAvatarURL)
			.setDescription(`Successfully fabricated **${fabricated.created.amount} ${fabricated.created.type}**!\nThis has cost you:${fabricated.cost.map(x => '\n\t' + x[0] + 'x ' + x[1]).join('')}`)
			.setColor('GREEN')
			.setFooter(`Use the ${client.prefix}factory command to view information about your crop!`);
		message.channel.send(farmEmbed);
	}
};

module.exports.help = {
	name: 'fabricate',
	usage: '<prefix>fabricate <crop> <amount>',
	hideinhelp: false,
	requires: ['business'],
};
