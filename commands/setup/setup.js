module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	
			if(!stats) {
	
				message.channel.send(`
Alright, first things first, What should we call your business? **(?bname <business name>)**
`);
			}
			else {
				message.reply('You already have a business named **' + results[0].businessName + '** \nIf you would like to reset it do **?breset**');
			}
};

module.exports.help = {
	name: 'setup',
	hideinhelp: true,
};
