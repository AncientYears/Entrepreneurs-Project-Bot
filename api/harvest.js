const harvestAbles = {
	farm: ['potato', 'carrot_seed', 'corn_seed'],
	factory: ['popcorn', 'chips', 'nutrient_paste'],
};
const harvestCosts = {
	example: [
		[1, 'item_name'],
	],
};

const harvestRewards = {
	potato: [
		[3, 'potato'],
	],
	carrot_seed: [
		[3, 'carrot'],
	],
	corn_seed: [
		[3, 'corn'],
	],
	popcorn: [
		[3, 'popcorn'],
	],
	cips: [
		[3, 'chips'],
	],
	nutrient_paste: [
		[3, 'nutrient_paste'],
	],
};

const harvestLuck = {
	default: [100, 100],
	carrot_seed: [50, 100],
	corn_seed: [30, 100],
};

/*  JUST DONT CHANGE STUFF BEHIND HERE */
module.exports = (database, stats) => {
	if(!stats.creation.time || Date.now() <= stats.creation.time) {
		return { status: 400, error : 'zumza-produceNotFinished', timeLeft: isNaN(stats.creation.time) ? -1 : Number(stats.creation.time) - Date.now() };
	}
	else if(!harvestAbles[stats.business.type] || !harvestAbles[stats.business.type].includes(stats.creation.type)) {
		return { status: 400, error : 'zumza-businessTypeNotValid', ableTypes: getTypes(stats.creation.type, harvestAbles) };
	}
	else {

		if(harvestCosts[stats.creation.type]) {
			harvestCosts[stats.creation.type].forEach(material => {
				stats.stocks[material[1]] = Number(stats.stocks[material[1]] == undefined ? 0 : stats.stocks[material[1]]) - Number(material[0]);
			});
			const missing = Object.keys(stats.stocks).map(stock => {
				if(stats.stocks[stock] < 0) return [stats.stocks[stock] * -1, stock];
				else return undefined;
			}).filter(test => test);

			if(missing.length) return { error: 'zumza-notEnoughMaterial', status: 400, missing: missing };
		}
		const luck = getRandomIntInclusive(harvestLuck[stats.creation.type] == undefined ? harvestLuck['default'][0] : harvestLuck[stats.creation.type][0], harvestLuck[stats.creation.type] == undefined ? harvestLuck['default'][1] : harvestLuck[stats.creation.type][1]);


		const harvested = harvestRewards[stats.creation.type].map(reward => {
			stats.stocks[reward[1]] = (stats.stocks[reward[1]] == undefined ? 0 : Number(stats.stocks[reward[1]])) + Number(reward[0] * luck * stats.creation.amount).toFixed(0);
			return [ Number(Number(reward[0]) * luck * stats.creation.amount).toFixed(0), reward[1]];

		});


		database.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${stats.userID}'`);
		database.query(`UPDATE stats SET creation = '${JSON.stringify(null)}' WHERE userID = '${stats.userID}'`);

		let cost = null;
		if (harvestCosts[stats.creation.type]) cost = harvestCosts[stats.creation.type].map(material => [Number(material[0]), material[1]]);

		return { status: 200, stats : stats, harvested: harvested, cost: cost, luck: luck };
	}
};

function getTypes(toProduce, harvestAble) {
	const types = Reflect.ownKeys(harvestAble).map(type => {
		if(harvestAble[type].includes(toProduce)) return type;
		else return undefined;
	});
	return types.filter(test => test).length == 0 ? [`None, are you sure '${toProduce}' is valid!`] : types.filter(test => test);
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return (Math.floor(Math.random() * (max - min + 1)) + min) / 100; // The maximum is inclusive and the minimum is inclusive
}