const { Client, Message } = require('discord.js');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 */
module.exports.run = async (client, message, args) => {
	if(!args || args.size < 1) return message.reply('Must provide a command name to reload.');
	const commandName = args[0];
	// Check if the command exists and is valid
	const cmd = client.commands.get(commandName);
	if(!cmd) {
		return message.reply('That command does not exist');
	}
	// the path is relative to the *current folder*, so just ./filename.js
	delete require.cache[require.resolve(`..${cmd.help.category ? '/' + cmd.help.category : '' }/${commandName}.js`)];
	// We also need to delete and reload the command from the client.commands Enmap
	client.commands.delete(commandName);
	const props = require(`..${cmd.help.category ? '/' + cmd.help.category : '' }/${commandName}.js`);
	props.help['category'] = cmd.help.category;
	client.commands.set(commandName, props);
	return message.reply(`The command ${commandName} has been reloaded`);
};


module.exports.help = {
	name: 'reload',
	description: 'reload a command',
	usage: '<prefix>reload <cmd>',
	hideinhelp:true,
	requires: ['botowner'],
};