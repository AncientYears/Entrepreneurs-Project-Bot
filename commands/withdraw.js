module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(!args[0]) return message.channel.send('Include a number!\n**?withdraw <amount>**');
	if(isNaN(args[0])) return message.channel.send('Invalid Number.');
	if(args[0] <= 0) return message.channel.send('You cannot withdraw negative money!');
	if(stats.bank < args[0]) return message.channel.send('You do not have that amount of money inside of your bank!');

	connection.query(`UPDATE stats SET bank = '${Number(stats.bank) - Number(args[0])}' WHERE userID = '${message.author.id}'`);
	connection.query(`UPDATE stats SET cash = '${Number(stats.cash) + Number(args[0])}' WHERE userID = '${message.author.id}'`);

	message.channel.send(`You have successfully withdrawn **${Number(args[0])}** from your bank! \nYou have **${Number(stats.bank) - Number(args[0])}** left inside your bank!`);
};

module.exports.help = {
	name: 'withdraw',
	aliases: ['wd', 'with'],
	hideinhelp: false,
};