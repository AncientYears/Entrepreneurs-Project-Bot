const Discord = require('discord.js');
/**
 * Command
 *
 * @param {Discord.Client} client - Discord.js Client
 * @param {Discord.Message} message - Discord.js Message
 * @param {Array} args - Args
 * @param {*} database - mysql2/promise DataBase
 */
module.exports.run = async (client, message, args, database) => {
	const [data] = await database.query('SELECT userID,market FROM businesseco.stats;');
	const viewmarket = transformMarket(data);
	let formatted = viewmarket
		.filter(i => i.type === args.join(' ') || !args.join(' '))
		.map(i => `${i.id}:\t\t${i.amount}x ${i.type} | ${i.price}$`);


	if (!formatted.length) formatted = 'None, Item not Avaible or not in the Market!';

	message.channel.send(formatted);

};

module.exports.help = {
	name: 'viewmarket',
	usage: '<prefix>viewmarket or <prefix>viewmarket <item_name>',
	description: 'View the market.',
	hideinhelp: false,
	requires: ['business'],
	cooldown: '1 min',
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
