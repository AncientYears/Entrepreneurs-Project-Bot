const ms = require('ms');
const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
	if(stats.timeLength !== 0) {
		message.channel.send('Your crops are already growing, use the **?farm** command to view information about them!');
	}
	else {
		if(!args[0] && args[0] !== stats.stocks.potato) return message.channel.send('You do no have this crop! \n**?plant <crop> <amount>');
		if(args[0] === 'potato' && !stats.stocks.potato && stats.stocks.potato <= 1) return message.channel.send('You do not have any potatoes, please go buy some \n**?buy**');
		if(isNaN(args[1])) return message.channel.send('Invalid Number! \n**?plant <crop> <amount>');

		connection.query(`UPDATE stats SET creation = '${Number(stats.creation) - Number(args[1])}' WHERE userID = '${message.author.id}'`);
		connection.query(`UPDATE stats SET timeLength = '${Number(message.createdTimestamp) + Number(ms('1h'))}' WHERE userID = '${message.author.id}'`);

		const farmEmbed = new discord.RichEmbed()
			.setAuthor('Plant', message.author.displayAvatarURL)
			.setDescription(`
Successfully planted **${args[1]} ${args[0]}**!		
`)
			.setColor('GREEN')
			.setFooter('Use the ?farm command to view information about your crop!');
		message.channel.send(farmEmbed);
	}
};

module.exports.help = {
	name: 'plant',
	hideinhelp: false,
	requires: ['business'],
};
