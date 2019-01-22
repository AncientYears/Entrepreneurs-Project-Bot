module.exports = (stats) => {
	process.emitWarning('Api#parseStats: use Api#getStats instead', 'DeprecationWarning');
	if(!stats) stats = {};
	if(!stats.cooldowns) stats.cooldowns = {};
	if(!stats.stocks) stats.stocks = {};
	if(!stats.creation) stats.creation = {};
	return { 'status': 200, 'data': stats };
};

