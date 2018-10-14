const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(!stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');

	const plantEmbed = new discord.RichEmbed
		.setAuthor('Plant', message.author.displayAvatarURL)
		.setDescription('W.I.P Command!');
	message.channel.send(plantEmbed);
};

module.exports.help = {
	name: 'plant',
	hideinhelp: false,
};