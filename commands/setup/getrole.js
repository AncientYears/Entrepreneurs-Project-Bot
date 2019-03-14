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
	if(!message.member) return message.channel.send('This is not a Guild!');
	if(message.member.roles.some(role => role.name === 'Entrepreneur-zumza')) return message.channel.send('You already have the rule O.o!').then(msg => msg.delete(5000));
	if(!stats || !stats.business.name) return message.reply(`Name your business first using **${client.prefix}bname**!`);
	if(!stats || !stats.business.type) return message.reply(`Select your business type using **${client.prefix}btype**`);
	if(!stats.business.location) {return message.reply(`Select your business type using **${client.prefix}blocate**`);}
	else {
		const roleToAdd = message.guild.roles.find(role => role.name === 'Entrepreneur-zumza');
		if(!roleToAdd) return message.channel.send('This guild has no role named `Entrepreneur-zumza`! But this one has for sure! https://discord.gg/mG7eQtw');
		message.member.addRole(roleToAdd);
		message.delete(5000).catch(() => null);
		message.reply('Here is your Role!').then(msg => msg.delete(5000));
	}
};

module.exports.help = {
	name: 'getrole',
	usage: '<prefix>getrole',
	hideinhelp: false,
};
