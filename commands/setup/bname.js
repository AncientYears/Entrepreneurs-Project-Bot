module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if (stats && stats.businessName) return message.reply('You already have a business named **' + stats.businessName + '** \nIf you would like to change it do **?breset**');

	if (!args.join(' ')) {
		return message.reply('**?bname <name>**');
	}
	else {
		connection.query(`SELECT * FROM stats WHERE businessName = '${args.join(' ')}'`, function(error, results) {
			if (error) throw error;
			if (results.length) return message.channel.send('Name already used!');
			connection.query(`INSERT IGNORE INTO stats (userID, businessName, businessType, businessLocation, cash, bank, netWorth, employees, stocks) VALUES ('${message.author.id}', '${args.join(' ')}', '', '', ${0}, ${0}, ${0}, ${0}, '{}')`);
			message.reply('You have successfully named your business as **' + args.join(' ') + '**! \n\nYou are of to a great start! \nNow, what type of business would this be? (Use **?btype** to view the possible types of businesses)');
		});
	}
};

module.exports.help = {
	name: 'bname',
	hideinhelp: true,
};
