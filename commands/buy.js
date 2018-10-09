const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool) => {
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
		if(args[1].startsWith('-')) return message.channel.send('Hey, you cannot buy negative potato(es)!');
		ecoPool.getConnection(function(err, connection) {
			connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
				if(results[0].cash < (1 * args[1])) return message.channel.send('You do not have enough cash to buy this!') && connection.release();
				const resultedArray = results[0].stocks;
				resultedArray[0] = args[1];
				connection.query(`UPDATE stats SET stocks = '${resultedArray}' WHERE userID = '${message.author.id}'`);
				connection.query(`UPDATE stats SET cash = '${results[0].cash - (1 * args[1])}' WHERE userID = '${message.author.id}'`);
				message.channel.send('You have successfully bought **' + args(1) + '** potato(es) \nThis has costed you **' + results[0].cash - (1 * args[1] + '**!'));
				connection.release();
			});
		});
	}
};

module.exports.help = {
	name: 'buy',
	hideinhelp: false,
};