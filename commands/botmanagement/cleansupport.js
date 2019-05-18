const { Client, Message } = require('discord.js');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 */
module.exports.run = async (client, message) => {
	await message.channel.bulkDelete(100);
	message.channel.send(client.format('**You will get a Channel/DM with instructions on how to setup your business, just follow them**\n**You will not get accses to the full server until you create your Business**\n**Use <prefix>getrole if you  already setup a business but still are here**'));

};


module.exports.help = {
	name: 'cleansupportchannel',
	description: 'cleansupportchannel',
	usage: '<prefix>cleansupportchannel',
	hideinhelp: true,
	requires: ['botowner'],
};