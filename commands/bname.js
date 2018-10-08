module.exports.run = async (client, message, args, ecoPool) => {
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			connection.query('SELECT * FROM stats', function(error2, results2, fields2) {
				if(!results[0].businessName) {
					if(!args.join(' ')) {
						return message.reply('**?bname <name>**');
					}
					else {
						let i;
						for (i = 0; i <= results2.length; i++) {
							console.log(i);
							console.log(results2.length);
							if(args.join(' ').toLowerCase() === results2[i].businessName) {
								connection.release();
								message.reply('Sorry, but that name is taken. Please try a differnt name.');
								return;
							}
						}
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
	});
};

module.exports.help = {
	name: 'bname',
	hideinhelp: true,
};