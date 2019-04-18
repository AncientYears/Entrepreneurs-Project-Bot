require('dotenv').config();
const { ShardingManager } = require('discord.js');
const Manager = new ShardingManager('client.js', { token: process.env.TOKEN });
Manager.on('shardCreate', (shard) => {
	console.log(`Shard #${shard.id} is created!`);
});
Manager.spawn();