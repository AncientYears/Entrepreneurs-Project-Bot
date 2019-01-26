// Packages
const Discord = require('discord.js'); // For Embed
const uptime = require(process.cwd() + '/utils/uptime.js'); // For uptime

module.exports.help = {
	name: 'botinfo',
	description: 'Shows you the Bot Info',
	usage: '<prefix>botinfo',
	aliases: ['info', 'bot'],
};

module.exports.run = async (bot, message) => {
	const botembed = new Discord.RichEmbed()
		.setTitle('Bot Information')
		.setColor('RANDOM')
		.setTimestamp(message.createdAt)
		.setAuthor(bot.user.username, bot.user.displayAvatarURL)
		.addField('Bot Created on', new Date(bot.user.createdAt).toUTCString(), true)
		.addField('⏱ uptime', `${uptime(bot.uptime)}`, true);

	const m = await message.channel.send(botembed);
	await botembed.addField('Ping:', `Latency is ${m.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(bot.ping)}ms!`);
	await m.edit(botembed);
};