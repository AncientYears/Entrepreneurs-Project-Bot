const discord = require('discord.js');

/**
 * Command
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {Array} args
 * @param {*} ecoPool
 */
module.exports.run = async (client, message, args, ecoPool) => {


	const [users] = await ecoPool.query('SELECT userID, cooldowns FROM businesseco.stats');
	if(!args.join(' ')) args = ['30', 'days'];
	const dbembed = new discord.RichEmbed().setTitle('DB Purge Report');
	const purger = users.map(data=> {
		if(!data.cooldowns) return data.userID;
		if(((Date.now() - Number(require('ms')(args.join(' ')))) - Math.max(...Object.values(data.cooldowns))) > 0) return data.userID;
		else return;
	}).filter(element => element);

	const purgeable = await purger.map(async purge => {
		const data = await client.fetchUser(purge);
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