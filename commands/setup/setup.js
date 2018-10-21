module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(!stats.businessName) {
		client.emit('guildMemberAdd', message.author);
	}
	else {
		message.reply('You already have a business named **' + stats.businessName + '** \nIf you would like to reset it do **?breset**');
	}
};

module.exports.help = {
	name: 'setup',
	hideinhelp: true,
};
