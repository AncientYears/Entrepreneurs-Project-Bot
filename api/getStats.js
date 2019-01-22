module.exports = async (id, ecoPool) => {
	let [[stats]] = await ecoPool.query(`SELECT * FROM stats WHERE userID = '${id}'`);
	if (!stats) {
		await ecoPool.query(`INSERT IGNORE INTO stats (userID) VALUES ('${id}')`);
		stats = {};
	}
	if(!stats.cooldowns) stats.cooldowns = {};
	if(!stats.stocks) stats.stocks = {};
	if(!stats.creation) stats.creation = {};
	return { 'status': 200, 'data': stats };

};

