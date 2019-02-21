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
