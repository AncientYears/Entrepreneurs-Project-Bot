```js
module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
// cmd code
};

module.exports.help = {
	name: 'cmd name',
	description: 'description'
	usage: 'usage',
	requires: ['botowner', 'guild', 'dm', 'business']
	aliases: ['a', 'b']
	hideinhelp: true,
	cooldown: '5min'
};
```
