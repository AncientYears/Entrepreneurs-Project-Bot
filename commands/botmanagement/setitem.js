module.exports.run = async (client, message, args, database) => {
	let user = message.mentions.users.first() || client.users.get(args[0]);
	let amount = 0;
	let item = undefined;
	if(user) {
		item = args[1];
		amount = args[2];
	}
	else {
		user = message.author;
		item = args[0];
		amount = args[1];
	}
	const stats = await client.api.getStats(message.author.id, database).then(data => data.data);
	stats.stocks[item] = amount;
	database.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${user.id}'`);


};


module.exports.help = {
	name: 'setitem',
	description: 'setitem',
	usage: '<prefix>setitem <@|item> <amount|item> <|amount>',
	hideinhelp: true,
	requires: ['botowner'],
};