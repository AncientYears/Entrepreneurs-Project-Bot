const Discord = require('discord.js');
/**
 * Command
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {Array} args
 * @param {*} ecoPool
 * @param {Object} stats
 */
module.exports.run = async (client, message, args, database) => {
	const [data] = await database.query('SELECT userId,market FROM businesseco.stats;');
	const viewmarket = transformMarket(data);
	let formatted = viewmarket
		.filter(i => i.type === args.join(' '))
		.map(i => `${i.id}:\t\t${i.amount}x ${i.type} | ${i.price}$`);


	if(!formatted.length) formatted = 'None, Item not Avaible or not in the Market!';

	message.channel.send(formatted);

};

module.exports.help = {
	name: 'viewmarket',
	usage: '<prefix>viewmarket <name>',
	hideinhelp: false,
	requires: ['business'],
	cooldown: '1 min',
};


function transformMarket(data) {
	const transform = {};
	data.forEach(user => {
		if(!user.market) return;
		Object.entries(user.market).forEach((e) => {
			transform[e[0]] = e[1];
			transform[e[0]]['id'] = e[0];
			transform[e[0]]['userId'] = user.userId;
		});
	});
	return new Discord.Collection(Object.entries(transform));
}
