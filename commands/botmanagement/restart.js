const Discord = require('discord.js');

const { Client, Message } = require('discord.js');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 */
module.exports.run = async (client, message) => {
	if (!['193406800614129664', '211795109132369920'].includes(message.author.id)) return message.reply('This command cannot be used by you!');
	const restartembed = new Discord.RichEmbed()
		.setColor('RED')
		.setThumbnail(client.user.avatarURL)
		.setTitle('Status')
		.setDescription(`Please wait ${client.user.username} is restarting`);
	await message.channel.send(restartembed);
	client.destroy()
		.then(() => client.login(process.env.TOKEN));
	restartembed.setDescription(`${client.user.username} has restarted!`);
	client.once('ready', () => {
		message.channel.send(restartembed);
	});
};

module.exports.help = {
	name: 'restart',
	description: 'Restarts the Bot',
	usage: '<prefix>restart',
	hideinhelp: true,
	requires: ['botowner'],
};
