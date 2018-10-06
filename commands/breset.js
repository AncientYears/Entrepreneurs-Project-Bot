const Discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool) => {
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			if(!results.length) {
				connection.query(`INSERT IGNORE INTO stats (userID, businessName, businessType, businessLocation, cash, bank, netWorth, employees, stocks) VALUES ('${message.author.id}', '', '', '', ${0}, ${0}, ${0}, ${0}, ${0})`);
				connection.release();
				message.reply('You have not created a business yet, start off by naming one using **?bname <name>**!');
			}
			else {










				connection.query(`UPDATE stats SET businessName = '${args.join(' ')}' WHERE userID = '${message.author.id}'`);
				message.reply('You have successfully named your business as **' + args.join(' ') + '**! \n\nYou are of to a great start! \nNow, what type of business would this be? (Use **?btype** to view the possible types of businesses)');
				connection.release();
				if (error) throw error;
			}
		});
	});
};
module.exports.help = {
	name: 'breset',
	hideinhelp: true,
};