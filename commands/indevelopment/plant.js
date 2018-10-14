const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(!stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
	message.channel.send('W.I.P command');
};

module.exports.help = {
	name: 'plant',
	hideinhelp: false,
};