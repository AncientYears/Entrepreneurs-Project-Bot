module.exports = (stats) => {
	if(!stats) stats = {};
	if(!stats.cooldowns) stats.cooldowns = {};
	if(!stats.stocks) stats.stocks = {};
	if(!stats.creation) stats.creation = {};
	return stats;

};

