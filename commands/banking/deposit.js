const { Client, Message } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} ecoPool - DataBase
 * @param {Object} stats - Object containing User Stats
 */
module.exports.run = async (client, message, args, ecoPool, stats) => {
	const deposit = client.zumzaApi.deposit(ecoPool, stats, args[0]);
	if(deposit.status != 200) {
		if(deposit.error === 'zumza-NaN') return message.channel.send(`**'${deposit.NaN || 'null'}'** is not a Valid Number!\n**${client.format(this.help.usage)}**`);
		if(deposit.error === 'zumza-notEnoughMoney') return message.channel.send(`You do not eneugh money inside of your bank!\nYou need ${deposit.missing}$ more!`);
		return message.channel.send(`UNHANDLED ERROR, please notify Develeopers!\nThis command failed because of \`${deposit.error}\`\n\`\`\`${require('util').inspect(deposit)}\`\`\``);
	}

	return message.channel.send(`You have successfully deposited **${deposit.cost}** into your bank! \nYou have **${Number(deposit.stats.cash) - Number(deposit.cost)}** cash left!`);
};

module.exports.help = {
	name: 'deposit',
	aliases: ['dep', 'd'],
	usage: '<prefix>deposit <amount>',
	description: 'Used to deposit Money to your Bank!',
	hideinhelp: false,
};