module.exports.run = (client, message, args, ecoPool, stats) => {
	const deposit = client.api.deposit(ecoPool, stats, args[0]);
	if(deposit.status != 200) {
		if(deposit.error === 'zumza-NaN') return message.channel.send(`**'${deposit.NaN || 'null'}'** is not a Valid Number!\n**${client.prefix}${this.help.usage}**`);
		if(deposit.error === 'zumza-notEnoughMoney') return message.channel.send(`You do not eneugh money inside of your bank!\nYou need ${deposit.missing}$ more!`);
		return message.channel.send(`This command failed because of \`${deposit.error}\`\n\`\`\`${require('util').inspect(deposit)}\`\`\``);
	}

	message.channel.send(`You have successfully deposited **${deposit.cost}** into your bank! \nYou have **${Number(deposit.stats.cash) - Number(deposit.cost)}** cash left!`);
};

module.exports.help = {
	name: 'deposit',
	aliases: ['dep', 'd'],
	usage: 'deposit <amount>',
	description: 'Used to deposit Money to your Bank!',
	hideinhelp: false,
};