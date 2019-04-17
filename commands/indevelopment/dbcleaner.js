const { Client, Message, MessageEmbed } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} ecoPool - DataBase
 */
module.exports.run = async (client, message, args, ecoPool) => {


	const [users] = await ecoPool.query('SELECT userID, cooldowns FROM businesseco.stats');
	if(!args.join(' ')) args = ['30', 'days'];
	const dbembed = new MessageEmbed().setTitle('DB Purge Report');
	const purger = users.map(data=> {
		if(!data.cooldowns) return data.userID;
		if(((Date.now() - Number(require('ms')(args.join(' ')))) - Math.max(...Object.values(data.cooldowns))) > 0) return data.userID;
		else return;
	}).filter(element => element);

	const purgeable = await purger.map(async purge => {
		const data = await client.user.fetch(purge);
		return purge + ' | ' + data.tag;
	});

	const prugedata = await Promise.all(purgeable);

	dbembed.addField('DB Entrys that did\'nt run a cmd since ' + require('ms')(require('ms')(args.join(' ')), { long: true }), prugedata);
	dbembed.addField('Total Members Checked', users.length).addField('Members who Qualify for Purge', purger.length).addField('People who wouldnt get purged', (users.length - purger.length));
	const msg = await message.channel.send(dbembed);
	await msg.react('527066167215521813');
	await msg.react('527066157103185921');
	const filter = (reaction, user) => (reaction.emoji.id === '527066167215521813' || reaction.emoji.id === '527066157103185921') && user.id === message.author.id;
	const collector = msg.createReactionCollector(filter, { time: 30000, max: 1 });
	collector.on('end', collected => {
		if(!collected.size) return message.channel.send('You did not select an Answer!');
		const answer = collected.first().emoji.name;

		console.log(answer);
	});

};

module.exports.help = {
	name: 'dbcleaner',
	hideinhelp: true,
	requires: ['botowner'],
};