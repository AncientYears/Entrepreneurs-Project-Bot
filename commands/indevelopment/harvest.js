module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(stats.businessType !== 'farm') return message.channel.send('Sorry, you do not have a farm! \nYou have a **' + stats.businessType + '**');
	if(!stats.creation.time || message.createdTimestamp <= stats.creation.time) return message.channel.send(`Your crops are not ready to harvest! \nUse the **${client.prefix}farm** command to view information about your crops`);


	ecoPool.query(`UPDATE stats SET stocks = '${JSON.stringify(stats.stocks)}' WHERE userID = '${message.author.id}'`);
	ecoPool.query(`UPDATE stats SET creation = '${JSON.stringify(null)}' WHERE userID = '${message.author.id}'`);

};

module.exports.help = {
	name: 'harvest',
	hideinhelp: false,
	requires: ['business'],
};