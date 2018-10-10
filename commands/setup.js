module.exports.run = async (client, message, args, ecoPool) => {
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			if(!results[0].businessName) {
				connection.release();
				if (error) throw error;
				message.channel.send(`
Alright, first things first, What should we call your business? **(?bname <business name>)**
`);
			}
			else {
				message.reply('You already have a business named **' + results[0].businessName + '** \nIf you would like to reset it do **?breset**');
				connection.release();
				if (error) throw error;
			}
		});
	});
};

module.exports.help = {
	name: 'setup',
	hideinhelp: true,
};