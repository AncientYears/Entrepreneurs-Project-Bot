const ms = require('ms');
const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
	if(stats.creation.amount) {
		message.channel.send('Your crops are already growing, use the **?farm** command to view information about them!');
	}
	else {
		if(!args[0] | args[0] !== 'potato') return message.channel.send(`You do not have this crop! \n**${this.help.usage}**`);

		if(args[0] === 'potato' && !stats.stocks['potato_seeds'] && stats.stocks['potato_seeds'] <= 0) return message.channel.send('You do not have any potatoes, please go buy some \n**?buy**');
		if(args[0] === 'potatoes') args[0] = 'potato';
		if(args[0] !== 'potato') return message.channel.send('You can only plant potato!');
		if(isNaN(args[1])) return message.channel.send('Invalid Number! \n**?plant <crop> <amount>');
		if(args[0] === 'potato' && (!stats.stocks['potato_seeds'] || stats.stocks['potato_seeds'] <= args[1])) return message.channel.send('You do not have ENEUGH potatoes, please go buy some MORE \n**?buy**');

		stats.stocks.potato = Number(stats.stocks['potato_seeds']) - Number(args[1]);
		stats.creation = {
			'type': 'potato',
			'amount': args[1],
			'time': (Number(message.createdTimestamp) + Number(ms('1h'))),
		};
		ecoPool.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${message.author.id}'`, console.log);
		ecoPool.query(`UPDATE stats SET creation = '${JSON.stringify(stats.creation)}' WHERE userID = '${message.author.id}'`);
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
	usage: 'plant <crop> <amount>',
	hideinhelp: false,
	requires: ['business'],
};
