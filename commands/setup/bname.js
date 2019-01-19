module.exports.run = async (client, message, args, ecoPool, stats) => {
	if (stats && stats.businessName) return message.reply(`You already have a business named **' + stats.businessName + '** \nIf you would like to change it do **${client.prefix}breset**`);
	if (!args.join(' ')) {
		return message.reply(`**${client.prefix}bname <name>**`);
	}
	else {
		ecoPool.query(`SELECT * FROM stats WHERE businessName = '${args.join(' ')}'`, function(error, results) {
			if (error) throw error;
			if (results.length) return message.channel.send('Name already used!');
			ecoPool.query(`UPDATE stats SET businessName = '${args.join(' ')}' WHERE userID = '${message.author.id}'`);
			message.reply(`You have successfully named your business as **' + args.join(' ') + '**! \n\nYou are of to a great start! \nNow, what type of business would this be? (Use **${client.prefix}btype** to view the possible types of businesses)`);
		});
	}
};

module.exports.help = {
	name: 'bname',
	hideinhelp: true,
};
