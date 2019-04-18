const { Client, Message } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} ecoPool - DataBase
 * @param {Object} stats - Object containing User Stats
 */
module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(stats && stats.business.name == '') {
		return message.reply(`You have not created a business yet, start off by naming one using **${client.prefix}setup**!`);
	}
	else {
		const msg = await message.reply('Do you really want to reset your **WHOLE** business? (yes/no)');
		await msg.react('527066167215521813');
		await msg.react('527066157103185921');
		const filter = (reaction, user) => (reaction.emoji.id === '527066167215521813' || reaction.emoji.id === '527066157103185921') && user.id === message.author.id;
		const collector = msg.createReactionCollector(filter, { time: 30000, max: 1 });
		collector.on('end', collected => {
			if(!collected.size) return message.reply('Timed out! Run the command again');
			const answer = collected.first().emoji.id;
			if(answer == '527066167215521813') {
				ecoPool.query(`DELETE FROM stats WHERE userID = '${message.author.id}'`);
				message.reply(`Your business was successfully reset, create a new one using **${client.prefix}setup**!`);
			}
			else if (answer == '527066157103185921') {
				message.reply('Your business was not reset!');
			}
		});
	}
};
module.exports.help = {
	name: 'breset',
	description: 'Resets your Business',
	usage: '<prefix>breset',
	hideinhelp: false,
};
