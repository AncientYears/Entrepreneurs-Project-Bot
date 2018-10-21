module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(!stats.businessName) {
		if(!message.member) message.member = await client.guilds.get('490999695422783489').fetchMember(message.author)
		client.emit('guildMemberAdd', message.member);
	}
	else {
		message.reply('You already have a business named **' + stats.businessName + '** \nIf you would like to reset it do **?breset**');
	}
};

module.exports.help = {
	name: 'setup',
	hideinhelp: true,
};
