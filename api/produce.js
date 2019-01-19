const ms = require('ms');

module.exports = (client, ecoPool, message, stats, help, toproduce, amount) => {

	if(stats.creation.amount) {
		return message.channel.send(`Your crops are already growing, use the **${client.prefix}farm** command to view information about them`);
	}
	else {


		if(!stats.stocks[toproduce] && stats.stocks[toproduce] <= 0) return message.channel.send(`You do not have any ${toproduce}, please go buy some \n**${client.prefix}buy**`);

		if(isNaN(amount)) return message.channel.send(`Invalid Number! \n**${client.prefix}plant <crop> <amount>`);
		if(!stats.stocks[toproduce] || stats.stocks[toproduce] < amount) return message.channel.send(`You do not have ENEUGH ${toproduce}, please go buy some MORE \n**${client.prefix}buy**`);

		stats.stocks[toproduce] = Number(stats.stocks[toproduce]) - Number(amount);
		stats.creation = {
			'type': 'potato',
			'amount': amount,
			'time': (Number(message.createdTimestamp) + Number(ms('1h'))),
			'started': message.createdTimestamp,
		};
		ecoPool.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${message.author.id}'`);
		ecoPool.query(`UPDATE stats SET creation = '${JSON.stringify(stats.creation)}' WHERE userID = '${message.author.id}'`);
		return stats.creation;
	}
};

