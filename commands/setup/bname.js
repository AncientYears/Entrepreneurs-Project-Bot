const { Client, Message } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} ecoPool - DataBase
 * @param {Object} stats - Object containing User Stats
 */
module.exports.run = async (client, message, args, ecoPool, stats) => {
	if (stats && stats.business.name) return message.reply(`You already have a business named **${stats.business.name}** \nIf you would like to change it do **${client.prefix}breset**`);
	if (!args.join(' ')) {
		return message.reply(client.format(`**${this.help.usage}**`));
	}
	else {
		const found = await ecoPool.query('SELECT business, business->"$.name" as selectdata FROM stats WHERE JSON_EXTRACT(business, "$.name") = ?', [args.join(' ')]);
		if (found[0].length) return message.channel.send('Name already used!');
		stats.business.name = args.join(' ');
		ecoPool.query(`UPDATE stats SET business = '${JSON.stringify(stats.business)}' WHERE userID = '${message.author.id}'`).catch(() => message.channel.send(client.format('An Error occured, you may do <prefix>bug-report <msg> if you think this is an Bug!')));
		message.reply(`You have successfully named your business as **${args.join(' ')}**! \n\nYou're off to a great start! \nNow, what type of business would this be? (Use **${client.prefix}btype** to view the possible types of businesses)`);

	}
};

module.exports.help = {
	name: 'bname',
	usage: '<prefix>bname <name>',
	hideinhelp: true,
};
