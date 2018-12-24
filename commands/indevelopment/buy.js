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
			.setDescription(`**potato_seeds** - 1$ / 1
							- Cheap crop, not the most profitable though.`)
			.setFooter(client.prefix + 'buy <item> <amount> to purchase an item');
		return message.channel.send(farmEmbed);
	}
	else if (tobuy === 'potato' || tobuy === 'potatoes') {
		if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
		if(isNaN(args[1])) return message.channel.send(`How many potatoes do you wanna buy? **${client.prefix}buy potato <amount>**`);
		if(args[1] <= 0) return message.channel.send('Hey, you cannot buy negative potato(es)!');
		if(stats.cash < (1 * args[1])) return message.channel.send('You do not have enough cash to buy this!');

		if(stats.stocks) {
			if(!stats.stocks.potato_seeds) stats.stocks['potato_seeds'] = 0;
			stats.stocks['potato_seeds'] += parseInt(args[1]);
			ecoPool.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${message.author.id}'`);
			ecoPool.query(`UPDATE stats SET cash = '${stats.cash - args[1]}' WHERE userID = '${message.author.id}'`);
			return message.channel.send(`You have successfully bought **${args[1]}** potato(es) Seeds!\nThis has costed you **${1 * args[1]}**!`);
		}
	}
};

module.exports.help = {
	name: 'buy',
	hideinhelp: false,
};