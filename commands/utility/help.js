module.exports.run = async (client, message, args) => {
	if(!args.length) {
		return message.author.send(
			client.commands.map(props => props.help.hideinhelp ? '' : `**Command: ${props.help.name}**\n${props.help.category ? `\tCategory: ${props.help.category}\n` : '' }${props.help.description ? `\tDescription: ${props.help.description}\n` : '' }${props.help.usage ? `\tUsage: ${props.help.usage}\n` : '' }${props.help.aliases ? `\tAliases: ${props.help.aliases.join(', ')}\n` : '' }`).filter(data => data !== '')
			, { split: { char: '\n\n' } })
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.reply('I\'ve sent you a DM with all my commands!');
			})
			.catch(error => {
				message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
				if(error.code != 50007) throw new Error(`Could not send help DM to ${message.author.tag}.\n` + error);
			});
	}
	const cmd = args.join(' ').toLowerCase();
	const command = client.commands.get(cmd) || client.commands.find(commanda => commanda.help.aliases && commanda.help.aliases.includes(cmd));
	if (!command) return message.reply('that\'s not a valid command!');
	const helpcmd = [];
	helpcmd.push(`**Name:** ${command.help.name}`);
	if (command.help.category) helpcmd.push(`**Aliases:** ${command.help.category}`);
	if (command.help.aliases) helpcmd.push(`**Aliases:** ${command.help.aliases.join(', ')}`);
	if (command.help.description) helpcmd.push(`**Description:** ${command.help.description}`);
	if (command.help.usage) helpcmd.push(`**Usage:** ${command.help.usage}`);
	message.channel.send(helpcmd, { split: true });

};

module.exports.help = {
	name: 'help',
	description: 'Shows all the commands',
	usage: '?help or ?help <command>',
	aliases: '',
};