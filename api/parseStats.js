module.exports = (stats) => {
	if(!stats.business) stats.business = {};
	if(!stats.business.name) stats.business.name = '';
	if(!stats.business.type) stats.business.type = '';
	if(!stats.business.location) stats.business.location = '';
	if(!stats.cooldowns) stats.cooldowns = {};
	if(!stats.stocks) stats.stocks = {};
	if(!stats.creation) stats.creation = {};
	if(!stats.market) stats.market = {};
	return { 'status': 200, 'data': stats };
};

