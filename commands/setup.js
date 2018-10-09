module.exports.run = async (client, message, args, ecoPool) => {
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			if(!results[0].businessName) {
				connection.release();
				if (error) throw error;
				message.author.send(`
Welcome to the Entrepreneurs server!
I'm Zumza, a distant cousin of Wumpus. I will be your main accountant during your stay here. I will give you tips and advice on how to grow your very own business!

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