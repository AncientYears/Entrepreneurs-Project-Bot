module.exports.run = async (client, message, args, ecoPool) => {
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			if(!results[0].businessName) {
				if(!args.join(' ')) return message.reply('Include a name.');
				connection.query(`UPDATE stats SET businessName = '${args.join(' ')}' WHERE userID = '${message.author.id}'`);
				message.reply('You have successfully named your business as **' + args.join(' ') + '**! \n\nYou are of to a great start! \nNow, where do you wish to locate your business? (I have listed some suggestions for you, use **?blocate** to view the possible locations to setup your company)');
				connection.release();
				if (error) throw error;
			}
			else {
				message.reply('You already have a business named **' + results[0].businessName + '** \nIf you would like to change it do **?brename <name>**');
				connection.release();
				if (error) throw error;
			}
		});
	});
};

module.exports.help = {
	name: 'bname',
};