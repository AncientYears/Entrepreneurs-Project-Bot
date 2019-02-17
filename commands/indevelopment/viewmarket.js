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
	const viewmarket = {};
	data.forEach(user => {
		if(!user.market) return;
		Object.entries(user.market).forEach((e) => {
			if(e[1].type === args.join(' ')) viewmarket[e[0]] = e[1];
		});
	});
	let formatted = Object.entries(viewmarket).map(i => `${i[0]}:\t\t${i[1].amount}x ${i[1].type} | ${i[1].price}$`);
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


