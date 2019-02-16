module.exports.run = async (client, message, args, ecoPool, stats) => {
	if (stats && stats.business.name) return message.reply(`You already have a business named **${stats.business.name}** \nIf you would like to change it do **${client.prefix}breset**`);
	if (!args.join(' ')) {
		return message.reply(`**${client.prefix}bname <name>**`);
	}
	else {
		const found = await ecoPool.query(`SELECT business, business->"$.name" as selectdata FROM stats WHERE JSON_EXTRACT(business, "$.name") = '${args.join(' ')}'`);
		if (found[0].length) return message.channel.send('Name already used!');
		stats.business.name = args.join(' ');
		ecoPool.query(`UPDATE stats SET business = '${JSON.stringify(stats.business)}' WHERE userID = '${message.author.id}'`);
		message.reply(`You have successfully named your business as **' + args.join(' ') + '**! \n\nYou are of to a great start! \nNow, what type of business would this be? (Use **${client.prefix}btype** to view the possible types of businesses)`);
		message.reply(`You have successfully named your business as **${args.join(' ')}**! \n\nYou are of to a great start! \nNow, what type of business would this be? (Use **${client.prefix}btype** to view the possible types of businesses)`);

	}
};

module.exports.help = {
	name: 'bname',
	hideinhelp: true,
};
