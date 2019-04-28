function insert(num) {
	let str = '';
	for(let i = 0; i < num; i++) {str += ' ';}
	return str;
}


const { Client, Message } = require('discord.js');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 */
module.exports.run = async (client, message) => {

	const servers = client.guilds.map(g => {
		const guildName = g.name.slice(0, 30) + (g.name.length > 30 ? '...' : ''),
			memberCount = g.memberCount,
			users = g.members.filter(m => !m.user.bot).size,
			bots = 	g.members.filter(m => m.user.bot).size,
			userPbots = (users / bots).toPrecision(2),
			botsPusers = (bots / users).toPrecision(2);


		return guildName + insert(35 - guildName.length) + ' | ' +
		memberCount + insert(10 - memberCount.toString().length) + ' Members | ' +
		users + insert(10 - users.toString().length) + ' Users | ' +
		bots + insert(10 - bots.toString().length) + ' Bots | ' +
		userPbots + insert(10 - userPbots.length) + ' Users/Bot | ' +
		botsPusers + insert(10 - botsPusers.length) + ' Bots/User ';

	});

	return message.channel.send(servers, { code: true, split: true });
};


module.exports.help = {
	name: 'servers',
	description: 'servers',
	usage: '<prefix>servers',
	hideinhelp: true,
	requires: ['botowner'],
};