module.exports = (database, stats, amount) => {
	if(!amount || isNaN(amount) || Number(amount).toFixed(0) < 1) return { error: 'zumza-NaN', status: 400, NaN: amount }; amount = Number(amount).toFixed(0);
	if(stats.cash < amount) return { status: 400, error : 'zumza-notEnoughMoney', missing: amount - stats.cash };

	database.query(`UPDATE stats SET bank = '${Number(stats.bank) + Number(amount)}' WHERE userID = '${stats.userID}'`);
	database.query(`UPDATE stats SET cash = '${Number(stats.cash) - Number(amount)}' WHERE userID = '${stats.userID}'`);
	return { status: 200, stats: stats, cost: amount };

};
