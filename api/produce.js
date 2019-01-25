const ms = require('ms');

const produceAbles = {
	farm: ['potato'],
	test: ['test', 'nike'],
	shoefactory: ['nike'],
};
const produceCosts = {
	potato: [
		[1, 'potato'],
		[5, 'wood' ],
	],
};

module.exports = (client, ecoPool, message, stats, toProduce, amount) => {

	if(stats.creation.amount) {
		return { status: 400, error : 'zumza-alreadyProducing' };
	}
	else if(!produceAbles[stats.businessType].includes(toProduce)) {
		return { status: 400, error : 'zumza-businessTypeNotValid', ableTypes: getTypes(toProduce, produceAbles) };
	}
	else {

		if(isNaN(amount)) return { status: 400, error : 'zumza-NaN', NaN: amount };

		produceCosts[toProduce].forEach(material => {
			console.log(material);
			stats.stocks[material[1]] = Number(stats.stocks[material[1]] == undefined ? 0 : stats.stocks[material[1]]) - Number(amount * material[0]);
		});
		console.log(stats);
		const missing = Object.keys(stats.stocks).map(stock => {
			if(stats.stocks[stock] < 0) return [stats.stocks[stock] * -1, stock];
			else return undefined;
		}).filter(test => test);
		if(missing.length) return { error: 'zumza-notEneughMaterial', status: 400, missing: missing };

		stats.creation = {
			'type': 'potato',
			'amount': amount,
			'time': (Number(message.createdTimestamp) + Number(ms('1h'))),
			'started': message.createdTimestamp,
		};
		ecoPool.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${message.author.id}'`);
		ecoPool.query(`UPDATE stats SET creation = '${JSON.stringify(stats.creation)}' WHERE userID = '${message.author.id}'`);
		return { status: 200, stats : stats, created: stats.creation };
	}
};

function getTypes(toProduce, produceAble) {
	const types = Reflect.ownKeys(produceAble).map(type => {
		if(produceAble[type].includes(toProduce)) return type;
		else return undefined;
	});
	return types.filter(test => test).length == 0 ? [`None, are you sure '${toProduce}' is valid!`] : types.filter(test => test);
}