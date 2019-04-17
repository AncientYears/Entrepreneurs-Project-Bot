const { Client, Message, Collection } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} database - DataBase
 * @param {Object} stats - Object containing User Stats
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
	return new Collection(Object.entries(transform));
}
