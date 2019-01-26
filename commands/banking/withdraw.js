module.exports.run = async (client, message, args, ecoPool, stats) => {
	const withdraw = client.api.withdraw(ecoPool, stats, args[0]);
	if(withdraw.error) {
		return message.channel.send(`This command failed because of \`${withdraw.error}\`\n\`\`\`${require('util').inspect(withdraw)}\`\`\``);
		// TO-DO: Fancy Error Handler
	}

	message.channel.send(`You have successfully withdrawn **${Number(withdraw.cost)}** from your bank! \nYou have **${Number(withdraw.stats.bank) - Number(withdraw.cost)}** left inside your bank!`);
};

module.exports.help = {
	name: 'withdraw',
	aliases: ['wd', 'with'],
	hideinhelp: false,
};