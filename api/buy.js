module.exports = (client, ecoPool, message, stats, tobuy, amount, multiplier) => {

	if(isNaN(amount)) return { status: 400, message : `${amount} is an invalid number!` };
	if(amount <= 0) return { status: 400, message : `${amount} is negative!` };
	if(stats.cash < multiplier * amount) return { status: 400, message : 'Not eneugh money!' };
	if(!stats.stocks.potato) stats.stocks[tobuy] = 0;
	stats.stocks[tobuy] += parseInt(amount);
	ecoPool.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${message.author.id}'`);
	ecoPool.query(`UPDATE stats SET cash = '${stats.cash - multiplier * amount}' WHERE userID = '${message.author.id}'`);
	return { status: 200, message : `You have successfully bought **${amount}** ${tobuy}!\nThis has cost you **${multiplier * amount}**!` };
};

