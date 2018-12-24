const discord = require('discord.js');

/**
 * Command
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {Array} args
 * @param {*} ecoPool
 */
module.exports.run = async (client, message, args, ecoPool) => {


	const users = await ecoPool.query('SELECT userID, cooldowns FROM businesseco.stats');
	if(!args.join(' ')) args = ['30', 'days'];
	const dbembed = new discord.RichEmbed().setTitle('DB Purge Report');
	const purger = users.map(data=> {
		if(!data.cooldowns) return data.userID;
		if(((Date.now() - Number(require('ms')(args.join(' ')))) - Math.max(...Object.values(JSON.parse(data.cooldowns)))) > 0) return data.userID;
		else return;
	}).filter(element => element);

	const purgeable = purger.map(purge =>
		purge + ' ' + (client.users.get(purge) !== undefined ? client.users.get(purge).tag : '')
	);


	dbembed.addField('DB Entrys that did\'nt run a cmd since ' + require('ms')(require('ms')(args.join(' ')), { long: true }), await purgeable);
	dbembed.addField('Total Members Checked', users.length).addField('Members who Qualify for Purge', purger.length).addField('People who wouldnt get purged', (users.length - purger.length));
	message.channel.send(dbembed);

};

module.exports.help = {
	name: 'dbcleaner',
	hideinhelp: true,
	requires: ['botowner'],
};