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
			.setFooter('?buy <item> <amount> to purchase an item');
		message.channel.send(farmEmbed);
	}
};

module.exports.help = {
	name: 'buy',
	hideinhelp: false,
};