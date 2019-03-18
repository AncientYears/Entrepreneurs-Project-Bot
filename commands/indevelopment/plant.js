const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(!args[0] || !args[1]) return message.channel.send(client.format('Correct Usage: ' + this.help.usage));
	const planted = client.api.produce(ecoPool, stats, args[0], args[1]);
	if(planted.error || planted.status !== 200) {
		if(planted.error === 'zumza-alreadyProducing') {
			const Embed = new discord.RichEmbed()
				.setAuthor('You are already doing something. Get back here!!', message.author.displayAvatarURL)
				.setDescription(`You should be currently looking after your **${planted.stats.creation.type}**!`)
				.setColor('RED');
			return message.channel.send(Embed);
		}
		if(planted.error === 'zumza-businessTypeNotValid') {
			const Embed = new discord.RichEmbed()
				.setAuthor('Thats not your business!', message.author.displayAvatarURL)
				.setDescription(`These Business-types are able to do that job:\n${planted.ableTypes.join('\n')}`)
				.setColor('RED');
			return message.channel.send(Embed);
		}
		if(planted.error === 'zumza-notEnoughMaterial') {
			const Embed = new discord.RichEmbed()
				.setAuthor('Let\'s go shopping!', message.author.displayAvatarURL)
				.setDescription(`We are missing some stuff:${planted.missing.map(x => '\n\t' + x[0] + 'x ' + x[1]).join('')}`)
				.setColor('RED');
			return message.channel.send(Embed);
		}
		if(planted.error === 'zumza-NaN') {
			const Embed = new discord.RichEmbed()
				.setAuthor('That\'s not a Number!', message.author.displayAvatarURL)
				.setDescription(`'${planted.NaN}' is not a valid Number!`)
				.setColor('RED');
			return message.channel.send(Embed);
		}
		// TO-DO: Handle Uncommon Errors
		return message.channel.send(`This command failed because of \`${planted.error}\`\n\`\`\`${require('util').inspect(planted)}\`\`\``);
	}

	else {
		const farmEmbed = new discord.RichEmbed()
			.setAuthor('Plant', message.author.displayAvatarURL)
			.setDescription(`Successfully planted **${planted.created.amount} ${planted.created.type}**!\nThis has cost you:${planted.cost.map(x => '\n\t' + x[0] + 'x ' + x[1]).join('')}`)
			.setColor('GREEN')
			.setFooter(`Use the ${client.prefix}farm command to view information about your crop!`);
		message.channel.send(farmEmbed);
	}
};

module.exports.help = {
	name: 'plant',
	usage: '<prefix>plant <crop> <amount>',
	hideinhelp: false,
	requires: ['business', 'farm'],
};
