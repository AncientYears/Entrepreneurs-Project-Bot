const discord = require('discord.js');

/**
 * Command
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {Array} args
 * @param {*} ecoPool
 * @param {*} connection
 * @param {Object} stats
 */
module.exports.run = async (client, message, args, ecoPool, connection, stats) => {


	connection.query('SELECT userID, cooldowns FROM businesseco.stats', function(error, users) {
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


		dbembed.addField('DB Entrys that did\'nt run a cmd since ' + args.join(' '), purgeable);
		dbembed.addField('Total Members Checked', users.length).addField('Members who Qualify for Purge', purger.length).addField('People who wouldnt get purged', (users.length - purger.length));
		message.channel.send(dbembed);
	});
};

module.exports.help = {
	name: 'dbcleaner',
	hideinhelp: true,
	requires: ['botowner'],
};