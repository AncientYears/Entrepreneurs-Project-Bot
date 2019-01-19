module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(!stats.businessName) {
		if(!message.member) return message.channel.send('Please run this command in a guild!');
		client.emit('guildMemberAdd', message.member, message);
	}
	else {
		message.reply('You already have a business named **' + stats.businessName + '** \nIf you would like to reset it do **?breset**');
	}
};

module.exports.help = {
	name: 'setup',
	hideinhelp: true,
};
