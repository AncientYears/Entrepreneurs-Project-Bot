const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(!args[0]) {
		const categoryEmbed = new discord.MessageEmbed()
			.setAuthor('Categories', message.author.displayAvatarURL)
			.setDescription(`**Farm**
							- Buy all your farm supplies/upgrades here!
		
							**Coming Soon**
							- Coming soon, this is format test`)

			.setFooter(client.format('<prefix>buy <category> to view a category'));
		return message.channel.send(categoryEmbed);
	}
	else if (args[0] === 'farm') {
		const farmEmbed = new discord.MessageEmbed()
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

	const buy = client.zumzaApi.buy(ecoPool, stats, args[0], args[1]);
	if(buy.error || buy.status !== 200) {
		if(buy.error === 'zumza-notEnoughMoney') {
			const Embed = new discord.MessageEmbed()
				.setAuthor('You can\'t pay with nothing!', message.author.displayAvatarURL)
				.setDescription(`You need ${buy.missing}$ more!\nYou have ${stats.cash}$ with you and ${stats.bank}$ in your Bank!`)
				.setColor('RED');
			return message.channel.send(Embed);
		}
		else if(buy.error === 'zumza-NaN') {
			const Embed = new discord.MessageEmbed()
				.setAuthor('That\'s not a Number!', message.author.displayAvatarURL)
				.setDescription(`'${buy.NaN}' is not a valid Number!`)
				.setColor('RED');
			if(!buy.NaN) Embed.setDescription(client.format(this.help.usage));
			return message.channel.send(Embed);
		}
		else if(buy.error === 'zumza-itemNotValidOrNotBuyable') {
			const Embed = new discord.MessageEmbed()
				.setAuthor('That\'s not an Valid Item!', message.author.displayAvatarURL)
				.setDescription(`'${buy.NaI}' is not a valid, or has to be bought trough the market!`)
				.setColor('RED');
			if(!buy.NaI) Embed.setDescription(client.format(this.help.usage));
			return message.channel.send(Embed);
		}
		else {
			return message.channel.send(`UNHANDLED ERROR, please notify Develeopers!\nThis command failed because of \`${buy.error}\`\n\`\`\`${require('util').inspect(buy)}\`\`\``);
		}
	}
	const buyEmbed = new discord.MessageEmbed()
		.setAuthor('Plant', message.author.displayAvatarURL)
		.setDescription(`Successfully bought **${buy.bought[0]} ${buy.bought[1]}**!\nThis has cost you: **${buy.cost}$**`)
		.setColor('GREEN');
	message.channel.send(buyEmbed);
};

module.exports.help = {
	name: 'buy',
	hideinhelp: false,
	usage: '<prefix>buy <item> <amount>',
	requires: ['business'],
};