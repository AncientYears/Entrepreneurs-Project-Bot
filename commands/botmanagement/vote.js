const { Client, Message, MessageEmbed } = require('discord.js');


/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 */
module.exports.run = async (client, message) => {
	const voteEmbed = new MessageEmbed().setTitle('Vote for ', +client.user.tag).setDescription(`[Discord Bot List](https://discordbots.org/bot/${client.user.id})`);
	return message.channel.send(voteEmbed);
};


module.exports.help = {
	name: 'vote',
	description: 'vote',
	usage: '<prefix>vote',
	hideinhelp: false,
	requires: [],
};