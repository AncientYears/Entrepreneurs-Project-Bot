const discord = require('discord.js');
/**
 * Command
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {Array} args
 * @param {*} ecoPool
 * @param {Object} stats
 */
module.exports.run = async (client, message, args, database, stats) => {
	const SnowFlake = discord.SnowflakeUtil.generate();
	console.log(SnowFlake);

	if (isNaN(args[0]) || Number(args[0]).toFixed(0) < 1) return message.channel.send('zumza-NaN "' + args[0] + '"');
	args[0] = Number(args[0]).toFixed(0);

	if (isNaN(args[2]) || Number(args[2]).toFixed(0) < 1) return message.channel.send('zumza-NaN "' + args[2] + '"');
	args[2] = Number(args[2]).toFixed(0);


	const material = [args[0], args[1]];
	stats.stocks[material[1]] = Number(stats.stocks[material[1]] == undefined ? 0 : stats.stocks[material[1]]) - Number(material[0]);

	const missing = Object.keys(stats.stocks).map(stock => {
		if (stats.stocks[stock] < 0) return [stats.stocks[stock] * -1, stock];
		else return undefined;
	}).filter(test => test);

	if (missing.length) return message.channel.send('zumza-notEnoughMaterial  status: 400 ' + require('util').inspect(missing));

	stats.market[SnowFlake] = {
		type: args[1],
		amount: args[0],
		price: args[2],
	};
	database.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${stats.userID}'`);
	database.query(`UPDATE stats SET market = '${JSON.stringify(stats.market)}' WHERE userID = '${stats.userID}'`);
	message.channel.send('Your Items are now on the Market as: \n' + SnowFlake);
};

module.exports.help = {
	name: 'sellmarket',
	usage: '<prefix>sellmarket <amount> <item> <price>',
	hideinhelp: false,
	requires: ['business'],
};
