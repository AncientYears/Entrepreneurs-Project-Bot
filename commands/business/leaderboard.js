const discord = require('discord.js'); // eslint-disable-line no-unused-vars
const mysql = require('mysql2'); // eslint-disable-line no-unused-vars
/**
 * Command
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {Array} args
 * @param {mysql.Pool} ecoPool
 */
module.exports.run = async (client, message, args, ecoPool) => {
	const [data] = await ecoPool.query('select * from stats ORDER BY cash + bank DESC');
	const mydata = data.map((d, pos) => ({ cash: (d.cash + d.bank), pos: (pos + 1), userID: d.userID })).find(stats => stats.userID === message.author.id);
	const topfive = data.slice(0, 5).map((d, pos) => (pos + 1) + '# ' + (client.users.get(d.userID) === undefined ? d.userID : client.users.get(d.userID).tag) + ' with ' + (d.cash + d.bank) + '$');
	const embed = new discord.RichEmbed().setTitle('LeaderBoard').setColor('RANDOM').addField('Your Ranking', `Position: #${mydata.pos}\nCash: ${mydata.cash}$`).addField('Top 5', topfive);
	message.channel.send(embed);
};

module.exports.help = {
	name: 'leaderboard',
	usage: '<prefix>leaderboard',
	hideinhelp: false,
	requires: [],
};