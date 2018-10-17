module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(!args[0]) return message.channel.send('Include a number!\n**?deposit <amount>**');
	if(isNaN(args[0])) return message.channel.send('Invalid Number.');
	if(args[0] <= 0) return message.channel.send('You cannot deposit negative money!');
	if(stats.cash < args[0]) return message.channel.send('You do not have that amount of money!');

	connection.query(`UPDATE stats SET bank = '${Number(stats.bank) + Number(args[0])}' WHERE userID = '${message.author.id}'`);
	connection.query(`UPDATE stats SET cash = '${Number(stats.cash) - Number(args[0])}' WHERE userID = '${message.author.id}'`);

	message.channel.send(`You have successfully deposited **${Number(args[0])}** into your bank! \nYou have **${Number(stats.cash) - Number(args[0])}** cash left!`);
};

module.exports.help = {
	name: 'deposit',
	aliases: ['dep', 'd'],
	usage: 'deposit <amount>',
	description: 'Used to deposit Money to your Bank!',
	hideinhelp: false,
};
