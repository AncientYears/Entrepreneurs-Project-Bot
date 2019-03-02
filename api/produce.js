const ms = require('ms');

const produceAbles = {
	farm: ['potato', 'carrot_seed', 'corn_seed'],
	factory: ['popcorn', 'chips', 'nutrient_paste'],
};
const produceCosts = {
	potato: [
		[1, 'potato'],
	],
	carrot_seed: [
		[1, 'carrot_seed'],
	],
	corn_seed: [
		[1, 'corn_seed'],
	],
	popcorn: [
		[2, 'corn'],
	],
	chips: [
		[2, 'potato'],
	],
	nutrient_paste: [
		[2, 'corn'],
		[1, 'carrot'],
		[5, 'potato'],
	],

};
const produceTime = {
	potato: '1h',
	carrot_seed: '3h',
	corn_seed: '5h',
	popcorn: '1h',
	chips: '2h',
	nutrient_paste: '30m',
};

module.exports = (database, stats, toProduce, amount) => {
	if(stats.creation.amount) {
		return { status: 400, error : 'zumza-alreadyProducing', stats: stats };
	}
	else if(!produceAbles[stats.business.type].includes(toProduce)) {
		return { status: 400, error : 'zumza-businessTypeNotValid', ableTypes: getTypes(toProduce, produceAbles) };
	}
	else {
		if(isNaN(amount) || Number(amount).toFixed(0) < 1) return { status: 400, error : 'zumza-NaN', NaN: amount };
		amount = Number(amount).toFixed(0);

		if(produceCosts[toProduce]) {
			produceCosts[toProduce].forEach(material => {
				stats.stocks[material[1]] = Number(stats.stocks[material[1]] == undefined ? 0 : stats.stocks[material[1]]) - Number(amount * material[0]);
			});
			const missing = Object.keys(stats.stocks).map(stock => {
				if(stats.stocks[stock] < 0) return [stats.stocks[stock] * -1, stock];
				else return undefined;
			}).filter(test => test);

			if(missing.length) return { error: 'zumza-notEnoughMaterial', status: 400, missing: missing };
		}


		stats.creation = {
			'type': toProduce,
			'amount': amount,
			'time': Date.now() + ms(produceTime[toProduce] || '5min'),
			'started': Date.now(),
		};
		database.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${stats.userID}'`);
		database.query(`UPDATE stats SET creation = '${JSON.stringify(stats.creation)}' WHERE userID = '${stats.userID}'`);

		let cost = null;
		if (produceCosts[toProduce]) cost = produceCosts[toProduce].map(material => [Number(amount * material[0]), material[1]]);

		return { status: 200, stats : stats, created: stats.creation, cost: cost };
	}
};

function getTypes(toProduce, produceAble) {
	const types = Reflect.ownKeys(produceAble).map(type => {
		if(produceAble[type].includes(toProduce)) return type;
		else return undefined;
	});
	return types.filter(test => test).length == 0 ? [`None, are you sure '${toProduce}' is valid!`] : types.filter(test => test);
}
