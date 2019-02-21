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
	const [data] = await database.query('SELECT userID,market FROM businesseco.stats;');
	const transform = transformMarket(data);

	const offer = transform.get(args.join(' '));
	if (!offer) return message.channel.send('The ID is invalid!');
	if(offer.userID === stats.userID) return message.channel.send('Use !removemarket <id> instead!');
	if (stats.cash < offer.price) return message.channel.send('zumza-notEnoughMoney missing: ' + offer.price - stats.cash);


	if (!stats.stocks[offer.type]) stats.stocks[offer.type] = 0;
	stats.stocks[offer.type] = parseInt(stats.stocks[offer.type]) + parseInt(offer.amount);

	const sellerstats = await client.api.getStats(offer.userID, database).then(stat => stat.data);
	delete sellerstats.market[offer.id];
	database.query(`UPDATE stats SET market = '${JSON.stringify(sellerstats.market)}' WHERE userID = '${sellerstats.userID}'`);
	database.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${stats.userID}'`);
	database.query(`UPDATE stats SET cash = '${Number(sellerstats.cash) + Number(offer.price)}' WHERE userID = '${sellerstats.userID}'`);
	database.query(`UPDATE stats SET cash = '${stats.cash - offer.price}' WHERE userID = '${stats.userID}'`);
	message.channel.send('Succesfull!');
};

module.exports.help = {
	name: 'buymarket',
	usage: '<prefix>buymarket <name>',
	hideinhelp: false,
	requires: ['business'],
	cooldown: '5 min',
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