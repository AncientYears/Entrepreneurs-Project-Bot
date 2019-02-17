const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(!args[0]) {
		const categoryEmbed = new discord.RichEmbed()
			.setAuthor('Categories', message.author.displayAvatarURL)
			.setDescription(`**Farm**
							- Buy all your farm supplies/upgrades here!
		
							**Coming Soon**
							- Coming soon, this is format test`)

			.setFooter(client.format('<prefix>buy <category> to view a category'));
		return message.channel.send(categoryEmbed);
	}
	else if (args[0] === 'farm') {
		const farmEmbed = new discord.RichEmbed()
			.setAuthor('Farm', message.author.displayAvatarURL)
			.setDescription(`
							**potato** - 1$ / 1
							 - Cheap crop, not the most profitable though.
							**carrot_seed** - 2$ / 1
							 - A bit better, but slower than potatoes!
							 **corn_seed** - 5$ / 1
							 - Some of the best stuff you can grow, but very slow, and you may loose it all!
							 `)

			.setFooter(client.format('<prefix>buy <item> <amount> to purchase an item'));
		return message.channel.send(farmEmbed);
	}

	const buy = client.api.buy(ecoPool, stats, args[0], args[1]);
	if(buy.error) {
		return message.channel.send(`This command failed because of \`${buy.error}\`\n\`\`\`${require('util').inspect(buy)}\`\`\``);
		// TO-DO: Fancy Error Handler
	}
	const buyEmbed = new discord.RichEmbed()
		.setAuthor('Plant', message.author.displayAvatarURL)
		.setDescription(`Successfully bought **${buy.bought[0]} ${buy.bought[1]}**!\nThis has cost you: **${buy.cost}$**`)
		.setColor('GREEN');
	message.channel.send(buyEmbed);


/*

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
	*/
};

module.exports.help = {
	name: 'buy',
	hideinhelp: false,
	usage: '<prefix>buy <item> <amount>',
	requires: ['business'],
};