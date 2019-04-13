const { Client, Message } = require('discord.js');


const fakeargs = [];
fakeargs['deposit'] = '10';
fakeargs['withdraw'] = '10';
fakeargs['eval'] = '1+1';
fakeargs['reload'] = 'eval';
fakeargs['report-bug'] = 'Test Run';
fakeargs['restart'] = '10';
fakeargs['buy'] = 'potato 10';
fakeargs['stats'] = '10';


/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 */
module.exports.run = async (client, message) => {
	let x = 0;
	const data = client.commands.map(cmd => cmd.help.name);
	function myFunc(v) {
		if(['setitem', 'setmoney', 'settype', 'restart'].includes(v)) return;
		const fakeargsrun = fakeargs[v] ? fakeargs[v] : '';
		message.channel.send(`Running fake Command with ${message.author.tag}: Running ${client.prefix}${v} ${fakeargsrun}`);
		const fakeMessageData = message;
		fakeMessageData.content = `${client.prefix}${v} ${fakeargsrun}`;
		client.emit('message', fakeMessageData);
	}
	data.forEach((v) => {
		setTimeout(myFunc, x * 5000, v);
		x++;
	});


};


module.exports.help = {
	name: 'test',
	description: 'test',
	usage: '<prefix>test',
	hideinhelp: true,
	requires: ['botowner'],
};