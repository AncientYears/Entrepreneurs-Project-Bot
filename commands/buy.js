const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(!args[0]) {
		const categoryEmbed = new discord.RichEmbed()
			.setAuthor('Categories', message.author.displayAvatarURL)
			.setDescription(`
**Farm**
- Buy all your farm supplies/upgrades here!

**Coming Soon**
- Coming soon, this is format test
`)
			.setFooter('?buy <category> to view a category');
		message.channel.send(categoryEmbed);
	}
	else if (args[0].toLowerCase() === 'farm') {
		const farmEmbed = new discord.RichEmbed()
			.setAuthor('Farm', message.author.displayAvatarURL)
			.setDescription(`
**Potato** - 1$ / 1
- Cheap crop, not the most profitable though.
`)
			.setFooter('?buy <item> <amount> to purchase an item');
		message.channel.send(farmEmbed);
	}
	else if (args[0].toLowerCase() === 'potato') {

		if(isNaN(args[1])) return message.channel.send('How many potatoes do you wanna buy? **?buy potato <amount>**');
		if(args[1] <= 0) return message.channel.send('Hey, you cannot buy negative potato(es)!');
		if(stats.cash < (1 * args[1])) return message.channel.send('You do not have enough cash to buy this!');

		if(stats.stocks) {
			if(!stats.stocks.potato) stats.stocks.potato = 0;
			stats.stocks['potato'] += parseInt(args[1]);
			connection.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${message.author.id}'`);
			connection.query(`UPDATE stats SET cash = '${stats.cash - args[1]}' WHERE userID = '${message.author.id}'`);
			message.channel.send(`You have successfully bought **${args[1]}** potato(es) \nThis has costed you **${1 * args[1]}**!`);
		}
	}
};

module.exports.help = {
	name: 'buy',
	hideinhelp: false,
};