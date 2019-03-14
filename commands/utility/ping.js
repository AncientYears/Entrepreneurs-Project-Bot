const discord = require('discord.js');

const { Client, Message } = require('discord.js');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 */
module.exports.run = async (client, message) => {
	const pingEmbed = new discord.RichEmbed()
		.setAuthor('Bot Latency', client.user.avatarURL)
		.addField('Ping', Math.round(client.ping) + 'ms');

	message.channel.send(pingEmbed);
};

module.exports.help = {
	name: 'ping',
	description: 'Shows bot latency',
	usage: '<prefix>ping',
	aliases: ['pong'],
};