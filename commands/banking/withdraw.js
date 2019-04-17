const { Client, Message } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} ecoPool - DataBase
 * @param {Object} stats - Object containing User Stats
 */
module.exports.run = (client, message, args, ecoPool, stats) => {
	const withdraw = client.zumzaApi.withdraw(ecoPool, stats, args[0]);
	if(withdraw.status != 200) {
		if(withdraw.error === 'zumza-NaN') return message.channel.send(`**'${withdraw.NaN || 'null'}'** is not a Valid Number!\n**${client.format(this.help.usage)}**`);
		if(withdraw.error === 'zumza-notEnoughMoney') return message.channel.send(`You do not eneugh money inside of your bank!\nYou need ${withdraw.missing}$ more!`);
		return message.channel.send(`UNHANDLED ERROR, please notify Develeopers!\nThis Command failed because of \`${withdraw.error}\`\n\`\`\`${require('util').inspect(withdraw)}\`\`\``);
	}

	message.channel.send(`You have successfully withdrawn **${Number(withdraw.cost)}** from your bank! \nYou have **${Number(withdraw.stats.bank) - Number(withdraw.cost)}** left inside your bank!`);
};

module.exports.help = {
	name: 'withdraw',
	usage: '<prefix>withdraw <amount>',
	aliases: ['wd', 'with'],
	hideinhelp: false,
};