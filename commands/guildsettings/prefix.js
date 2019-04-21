const { Client, Message, MessageEmbed } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} ecoPool - DataBase
 * @param {Object} stats - Stats
 * @param {Object} guildSettings - Guild Settings
 */
module.exports.run = async (client, message, args, ecoPool, stats, guildSettings) => {
	if(!message.member) message.channel.send(client.format('Error, Code: `zumza-unC` please Contact Developers! <mainserverinvite>'));
	if(!message.member.permissions.has('MANAGE_GUILD') || !args[0]) return message.channel.send('The prefix is ' + guildSettings.prefix || client.prefix);
	await ecoPool.query(`INSERT IGNORE INTO guildSettings (guildID, prefix) VALUES ('${message.guild.id}', ${ecoPool.escape(args.join())})`);
	message.guild.guildSettings.prefix = args.join(' ');
	return message.channel.send('New Prefix is: ' + ecoPool.escape(args.join()));
};

module.exports.help = {
	name: 'prefix',
	description: 'Used to set new Prefix',
	usage: '<prefix>prefix <new_prefix>',
	requires: ['guild', 'embed'],
};