const { Client, Message } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} ecoPool - DataBase
 */
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