const buyPrice = {
	potato: 1,
};

module.exports = (ecoPool, stats, tobuy, amount) => {
	if(isNaN(amount) || Number(amount).toFixed(0) < 1) return { status: 400, error : 'zumza-NaN', NaN: amount };
	amount = Number(amount).toFixed(0);
	if(!buyPrice[tobuy]) return { status: 400, error : 'zumza-itemNotValidOrNotBuyable', NaI: tobuy };
	if(stats.cash < buyPrice[tobuy] * amount) return { status: 400, error : 'zumza-notEnoughMoney', missing: buyPrice[tobuy] * amount - stats.cash };
	if(!stats.stocks[tobuy]) stats.stocks[tobuy] = 0;
	stats.stocks[tobuy] += parseInt(amount);
	ecoPool.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${stats.userID}'`);
	ecoPool.query(`UPDATE stats SET cash = '${stats.cash - buyPrice[tobuy] * amount}' WHERE userID = '${stats.userID}'`);
	return { status: 200, stats: stats, cost: buyPrice[tobuy] * amount, bought: [amount, tobuy] };
};

