module.exports.run = async (client, message, args, ecoPool) => {
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			if(!results[0]) return connection.query(`INSERT IGNORE INTO stats (userID, businessName, businessType, businessLocation, cash, bank, netWorth, employees, stocks) VALUES ('${message.author.id}', '', '', '', ${0}, ${0}, ${0}, ${0}, ${0})`) && connection.release() && message.reply('An error occurred, please run the command again');
			if(!results[0].businessName) {
				if(!args.join(' ')) {
					return message.reply('Include a name.');
				}
				else {
					connection.query(`UPDATE stats SET businessName = '${args.join(' ')}' WHERE userID = '${message.author.id}'`);
					message.reply('You have successfully named your business as **' + args.join(' ') + '**! \n\nYou are of to a great start! \nNow, what type of business would this be? (Use **?btype** to view the possible types of businesses)');
					connection.release();
					if (error) throw error;
				}
			}
			else {
				message.reply('You already have a business named **' + results[0].businessName + '** \nIf you would like to change it do **?breset**');
				connection.release();
				if (error) throw error;
			}
		});
	});
};

module.exports.help = {
	name: 'bname',
	hideinhelp: true,
};