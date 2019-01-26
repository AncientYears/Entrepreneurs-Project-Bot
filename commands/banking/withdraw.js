module.exports.run = async (client, message, args, ecoPool, stats) => {
	const withdraw = client.api.withdraw(ecoPool, stats, args[0]);
	if(withdraw.status != 200) {
		if(withdraw.error === 'zumza-NaN') return message.channel.send(`**'${withdraw.NaN || 'null'}'** is not a Valid Number!\n**${client.prefix}${this.help.usage} <amount>**`);
		if(withdraw.error === 'zumza-notEnoughMoney') return message.channel.send(`You do not eneugh money inside of your bank!\nYou need ${withdraw.missing}$ more!`);
		return message.channel.send(`This command failed because of \`${withdraw.error}\`\n\`\`\`${require('util').inspect(withdraw)}\`\`\``);
	}

	message.channel.send(`You have successfully withdrawn **${Number(withdraw.cost)}** from your bank! \nYou have **${Number(withdraw.stats.bank) - Number(withdraw.cost)}** left inside your bank!`);
};

module.exports.help = {
	name: 'withdraw',
	usage: 'withdraw <amount>',
	aliases: ['wd', 'with'],
	hideinhelp: false,
};