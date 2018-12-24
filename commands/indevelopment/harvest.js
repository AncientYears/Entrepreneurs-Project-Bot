module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
	if(message.createdTimestamp <= stats.timeLength) return message.channel.send('Your crops are not ready to harvest! \nUse the **?farm** command to view information about your crops!');
	if(args[0] === 'potato' && !stats.stocks.potato && stats.stocks.potato <= 1) return message.channel.send('You do not have any potatoes, please go buy some \n**?buy**');


	ecoPool.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${message.author.id}'`);
	ecoPool.query(`UPDATE stats SET creation = 'NULL'' WHERE userID = '${message.author.id}'`);

};

module.exports.help = {
	name: 'harvest',
	hideinhelp: false,
	requires: ['business'],
};