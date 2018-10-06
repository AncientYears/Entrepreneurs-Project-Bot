const Discord = require('discord.js');

module.exports.run = async (client, message, args, ecoPool) => {
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			if(!results[0].businessName == '') {
				connection.query(`INSERT IGNORE INTO stats (userID, businessName, businessType, businessLocation, cash, bank, netWorth, employees, stocks) VALUES ('${message.author.id}', '', '', '', ${0}, ${0}, ${0}, ${0}, ${0})`);
				connection.release();
				message.reply('You have not created a business yet, start off by naming one using **?setup**!');
			}
			else {
				message.reply('Do you really want to reset your **WHOLE** business? (yes/no)');
				const filter = m => m.author.id === message.author.id;
				const collector = message.channel.createMessageCollector(filter, { time: 20000 });

				collector.on('collect', m => {
					if(m.content.toLowerCase() == 'yes') {
						connection.query(`UPDATE stats SET businessName = '', businessType = '', businessLocation = '', cash = ${0}, bank = ${0}, netWorth = ${0}, employees = ${0}, stocks = ${0} WHERE userID = '${message.author.id}'`);
						m.reply('Your business was successfully reset, create a new one using **?setup**!');
						connection.release();
					}
					else if (m.content.toLowerCase() == 'no') {
						m.reply('Your business was not reset!');
						connection.release();
					}
				});

				collector.on('end', collected => {
					message.reply('Timed out! Run the command again');
					connection.release();
				});
			}
		});
	});
};
module.exports.help = {
	name: 'breset',
	hideinhelp: true,
};