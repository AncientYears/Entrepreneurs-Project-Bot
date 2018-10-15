const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
	if(message.createdTimestamp <= stats.creation) return message.channel.send('Your crops are not ready to harvest! \nUse the **?farm** command to view information about your crops!');

	message.channel.send('Command is still in developement sorry!');
};

module.exports.help = {
	name: 'harvest',
	hideinhelp: false,
};