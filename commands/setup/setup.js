module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(!stats.business.name) {
		if(!message.member) return message.channel.send('Please run this command in a guild!');
		client.emit('guildMemberAdd', message.member, message);
	}
	else {
		message.reply(`You already have a business named **${stats.business.name}** \nIf you would like to reset it do **${client.prefix}breset**`);
	}
};

module.exports.help = {
	name: 'setup',
	hideinhelp: true,
};
