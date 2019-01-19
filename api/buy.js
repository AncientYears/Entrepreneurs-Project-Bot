module.exports = (client, ecoPool, message, stats, tobuy, amount, multiplier) => {

	if(isNaN(amount)) return message.channel.send(`How many ${tobuy} do you wanna buy? **${client.prefix}buy ${tobuy} <amount>**`);
	if(amount <= 0) return message.channel.send('Hey, you cannot buy negative Items!');
	if(stats.cash < multiplier * amount) return message.channel.send('You do not have enough cash to buy this!');
	if(!stats.stocks.potato) stats.stocks[tobuy] = 0;
	stats.stocks[tobuy] += parseInt(amount);
	ecoPool.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${message.author.id}'`);
	ecoPool.query(`UPDATE stats SET cash = '${stats.cash - multiplier * amount}' WHERE userID = '${message.author.id}'`);
	return message.channel.send(`You have successfully bought **${amount}** ${tobuy}!\nThis has cost you **${multiplier * amount}**!`);
};

