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


	// console.log('Checking Offer!');
	let offer = transformMarket([stats]).get(args.join(' '));


	if (!offer) {
		// console.log('Offer not found Locally checking Offer global!');

		const [data] = await database.query('SELECT userID,market FROM businesseco.stats;');
		const transform = transformMarket(data);
		offer = transform.get(args.join(' '));
	}


	if (!offer) return message.channel.send('No Item Found!');
	message.channel.send(require('util').inspect(offer));
};

module.exports.help = {
	name: 'marketinfo',
	usage: '<prefix>marketinfo <id>',
	description: 'Gives info abaut an item on the Market.',
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
