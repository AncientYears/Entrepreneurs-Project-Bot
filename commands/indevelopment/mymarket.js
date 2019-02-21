const Discord = require('discord.js');
/**
 * Command
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {Array} args
 * @param {*} ecoPool
 * @param {Object} stats
 */
module.exports.run = async (client, message, args, database, stats) => {

	let formatted = transformMarket([stats])
		.map(i => `${i.id}:\t\t${i.amount}x ${i.type} | ${i.price}$`);


	if (!formatted.length) formatted = 'None!';

	message.channel.send(formatted);

};

module.exports.help = {
	name: 'mymarket',
	usage: '<prefix>mymarket',
	hideinhelp: false,
	requires: ['business'],
};


function transformMarket(data) {
	const transform = {};
	data.forEach(user => {
		if (!user.market) return;
		Object.entries(user.market).forEach((e) => {
			transform[e[0]] = e[1];
			transform[e[0]]['id'] = e[0];
			transform[e[0]]['userID'] = user.userID;
		});
	});
	return new Discord.Collection(Object.entries(transform));
}
