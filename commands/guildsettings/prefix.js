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
	let prefix = (guildSettings.prefix || client.prefix);
	let prefix_c = ecoPool.escape(guildSettings.prefix || client.prefix);
	if(!message.member.permissions.has('MANAGE_GUILD') || !args[0]) return message.channel.send('The prefix is `' + prefix + '`');
	prefix_c = ecoPool.escape(args.join(' '));
	prefix = args.join(' ');
	if(prefix_c.length >= 100) return message.channel.send('Prefix too long!');
	await ecoPool.query(`INSERT IGNORE INTO guildSettings (guildID, prefix) VALUES ('${message.guild.id}', ${prefix_c})`);
	await ecoPool.query(`UPDATE guildSettings SET prefix = ${prefix_c} WHERE guildID = '${message.guild.id}'`);
	message.guild.guildSettings.prefix = prefix;
	return message.channel.send('New Prefix is: `' + prefix + '`');
};

module.exports.help = {
	name: 'prefix',
	description: 'Used to set new Prefix',
	usage: '<prefix>prefix <new_prefix>',
	requires: ['guild'],
};