const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, stats) => {

	if(!args[0]) {
		const categoryEmbed = new discord.RichEmbed()
			.setAuthor('Categories', message.author.displayAvatarURL)
			.setDescription(`**Farm**
							- Buy all your farm supplies/upgrades here!

		 					**Coming Soon**
							- Coming soon, this is format test`)
			.setFooter(client.prefix + 'buy <category> to view a category');
		return message.channel.send(categoryEmbed);
	}
	const tobuy = args[0].toLowerCase();
	if (tobuy === 'farm') {
		if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
		const farmEmbed = new discord.RichEmbed()
			.setAuthor('Farm', message.author.displayAvatarURL)
			.setDescription(`**potato** - 1$ / 1
							- Cheap crop, not the most profitable though.`)
			.setFooter(client.prefix + 'buy <item> <amount> to purchase an item');
		return message.channel.send(farmEmbed);
	}
	else if (tobuy === 'potato' || tobuy === 'potatoes') {
		if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
		message.channel.send(client.api.buy(client, ecoPool, message, stats, 'potato', args[1], 1).message);
	}
	else{ return message.channel.send('Invalid Operation');}
};

module.exports.help = {
	name: 'buy',
	hideinhelp: false,
	requires: ['business'],
};