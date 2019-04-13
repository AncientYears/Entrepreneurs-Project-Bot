const { Client, Message } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} database - DataBase
 */
module.exports.run = async (client, message, args, database) => {
	let user = message.mentions.users.first() || client.users.get(args[0]);
	let type = undefined;
	if(user) {
		type = args[1];
	}
	else {
		user = message.author;
		type = args[0];

	}
	const stats = await client.zumzaApi.getStats(message.author.id, database).then(data => data.data);
	stats.business.type = type;
	database.query(`UPDATE stats SET business = '${JSON.stringify(stats.business)}' WHERE userID = '${user.id}'`);


};


module.exports.help = {
	name: 'settype',
	description: 'settype',
	usage: '<prefix>settype <@|type> <type>',
	hideinhelp: true,
	requires: ['botowner'],
};