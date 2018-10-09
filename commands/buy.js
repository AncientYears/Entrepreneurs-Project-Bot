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
    if(!isNaN(args[1])) return message.channel.send('How many potatoes do you wanna buy? **?buy potato <amount>');
		message.channel.send('So you wanna buy a potato, huh? Well too bad the devs gotta make this part of the bot work first');
	}
};

module.exports.help = {
	name: 'buy',
	hideinhelp: false,
};