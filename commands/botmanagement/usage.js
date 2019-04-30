const { Client, Message } = require('discord.js');


/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 */
module.exports.run = async (client, message) => {
	const usage = client.commands.filter(cmd => cmd.help.used).map(cmd => cmd.help.name + ' : ' + cmd.help.used);
	return message.channel.send(usage);

};


module.exports.help = {
	name: 'usage',
	description: 'usage',
	usage: '<prefix>usage',
	hideinhelp: true,
	requires: ['botowner'],
};