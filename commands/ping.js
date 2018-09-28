const discord = require('discord.js');

module.exports.run = async (client, message, args) => {
	const pingEmbed = new discord.RichEmbed()
		.setAuthor('Bot Latency', client.user.avatarURL)
		.addField('Ping', client.ping);

	message.channel.send(pingEmbed);
};

module.exports.help = {
	name: 'ping',
	aliases: ['pong'],
};