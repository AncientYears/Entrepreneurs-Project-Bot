module.exports = async (id, database) => {
	let [[stats]] = await database.query(`SELECT * FROM stats WHERE userID = '${id}'`);
	if (!stats) {
		await database.query(`INSERT IGNORE INTO stats (userID) VALUES ('${id}')`);
		stats = {};
	}
	if(!stats.cooldowns) stats.cooldowns = {};
	if(!stats.stocks) stats.stocks = {};
	if(!stats.creation) stats.creation = {};
	return { 'status': 200, 'data': stats };

};

