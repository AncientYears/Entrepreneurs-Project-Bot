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

	const offer = transformMarket([stats]).get(args.join(' '));

	if (!offer) return message.channel.send('No Item Found!');

	if (!stats.stocks[offer.type]) stats.stocks[offer.type] = 0;
	stats.stocks[offer.type] = parseInt(stats.stocks[offer.type]) + parseInt(offer.amount);


	database.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${stats.userID}'`);
	delete stats.market[offer.id];
	database.query(`UPDATE stats SET market = '${JSON.stringify(stats.market)}' WHERE userID = '${stats.userID}'`);
	message.channel.send('Successfully removed!');
};

module.exports.help = {
	name: 'removemarket',
	usage: '<prefix>removemarket <id>',
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
