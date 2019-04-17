const { Client, Message, SnowflakeUtil } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} database - DataBase
 * @param {Object} stats - Object containing User Stats
 */
module.exports.run = async (client, message, args, database, stats) => {
	const SnowFlake = SnowflakeUtil.generate();
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
