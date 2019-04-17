const { Client, Message, MessageEmbed } = require('discord.js');
const percentageBar = require('percentagebar');

/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 */
module.exports.run = async (client, message) => {
	const indev = client.commands.filter(cmd => cmd.help.category == 'indevelopment').size;
	const devEmbed = new MessageEmbed().setTitle('As you know the Bot is currently in development, here are some Stats:')
		.setDescription(`We currently have ${client.commands.size} commands, of them are ${indev} currently indevelopment.\n This means ${percentageBar(client.commands.size, indev, 10)} of commands are indevelopment!\n`);
	message.channel.send(devEmbed);

};

module.exports.help = {
	name: 'indevelopment',
	description: 'Show info abaut the Bot\'s current status',
	usage: '<prefix>indevelopment',
	aliases: ['indev', 'development'],
};