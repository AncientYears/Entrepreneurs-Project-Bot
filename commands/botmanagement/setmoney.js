module.exports.run = (client, message, args, ecoPool) => {
	let user = message.mentions.users.first() || client.users.get(args[0]);
	let amount = 0;
	if(user) {amount = args[1];}
	else {
		user = message.author;
		amount = args[0];
	}
	ecoPool.query(`UPDATE stats SET cash = '${amount}' WHERE userID = '${user.id}'`);

};


module.exports.help = {
	name: 'setmoney',
	description: 'setmoney',
	usage: '<prefix>setmoney <@|money> <money>',
	hideinhelp:true,
	requires: ['botowner'],
};