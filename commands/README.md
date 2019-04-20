```js
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
// cmd code
};

module.exports.help = {
	name: 'cmd name',
	description: 'description',
	usage: 'usage',
	requires: ['botowner', 'guild', 'dm', 'business', 'farm', 'factory', 'shop', 'embed'],
	aliases: ['a', 'b'],
	hideinhelp: true,
	cooldown: '5min',
};
```
