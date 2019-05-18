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
	const forced = message.mentions.members.first() || message.member;
	if(message.author.id != forced.id) stats = await client.zumzaApi.getStats(forced.id, ecoPool).then(data => data.data);
	if(!stats.business.name) {
		if(!forced) return message.channel.send('Please run this command in a guild!');
		client.emit('guildMemberAdd', forced, message);
	}
	else if(!stats.business.type) {
		message.author = forced;
		message.channel = await forced.createDM();
		message.content = client.prefix + 'btype';
		client.emit('message', message);
	}
	else if(!stats.business.location) {
		message.author = forced;
		message.channel = await forced.createDM();
		message.content = client.prefix + 'blocate';
		client.emit('message', message);
	}
	else {
		message.author = forced;
		message.reply(`You already have a business named **${stats.business.name}** \nIf you would like to reset it do **${client.prefix}breset**`);
	}
};

module.exports.help = {
	name: 'fsetup',
	hideinhelp: true,
	description: 'Forces somebody to setup',
	require: ['botowner'],
};