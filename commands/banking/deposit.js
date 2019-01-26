module.exports.run = (client, message, args, ecoPool, stats) => {
	const deposit = client.api.deposit(ecoPool, stats, args[0]);
	if(deposit.error) {
		return message.channel.send(`This command failed because of \`${deposit.error}\`\n\`\`\`${require('util').inspect(deposit)}\`\`\``);
		// TO-DO: Fancy Error Handler
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
