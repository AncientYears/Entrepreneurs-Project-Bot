// Packages
const Discord = require('discord.js'); // For Embed
const uptime = require(process.cwd() + '/utils/uptime.js'); // For uptime

module.exports.help = {
	name: 'botinfo',
	description: 'Shows you the Bot Info',
	usage: '<prefix>botinfo',
	aliases: ['info', 'bot', 'client', 'clientinfo'],
};

const { Client, Message } = require('discord.js');
/**
 * @param {Client} bot - Discord.js Client
 * @param {Message} message - Discord.js Message
 */
module.exports.run = async (bot, message) => {
	const botembed = new Discord.MessageEmbed()
		.setTitle('Bot Information')
		.setColor('RANDOM')
		.setTimestamp(message.createdAt)
		.setAuthor(bot.user.username, bot.user.displayAvatarURL)
		.addField('Bot Created on', new Date(bot.user.createdAt).toUTCString(), true)
		.addField('uptime', `${uptime(bot.uptime)}`, false)
		.addField('Branch:', bot.branch, true)
		.addField(`Prefix: ${bot.prefix}`, '\u200B', true)
		.addField('Discord.Js Version', Discord.version, true)
		.addField('Indevelopment', bot.format(`${Math.round(bot.commands.filter(cmd => cmd.help.category == 'indevelopment').size / bot.commands.size * 100)}% of commands are indevelopment more info by doing <prefix>indevelopment.`));
	const m = await message.channel.send(botembed);
	await botembed.addField('Ping:', `Latency is ${m.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(bot.ws.ping)}ms!`);
	await m.edit(botembed);
};