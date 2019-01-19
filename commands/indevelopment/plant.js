const ms = require('ms');
const discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
	if(args[0] === 'potatoes') args[0] = 'potato';
	if(args[0] !== 'potato') return message.channel.send('You can only plant potato at the moment!');


	const planted = client.api.produce(client, ecoPool, message, stats, this.help, args[0], 1);
	if(planted.amount != undefined) {

		const farmEmbed = new discord.RichEmbed()
			.setAuthor('Plant', message.author.displayAvatarURL)
			.setDescription(`Successfully planted **${planted.amount} ${planted.type}**!`)
			.setColor('GREEN')
			.setFooter(`Use the ${client.prefix}farm command to view information about your crop!`);
		message.channel.send(farmEmbed);
	}

};

module.exports.help = {
	name: 'plant',
	usage: 'plant <crop> <amount>',
	hideinhelp: false,
	requires: ['business'],
};
