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
	const data = client.commands.map(cmd => cmd.help.name);
	function myFunc(i) {
		if(['setitem', 'setmoney', 'settype', 'restart'].includes(data[i])) return;
		const fakeargsrun = fakeargs[data[i]] ? fakeargs[data[i]] : '';
		console.log(`Running fake Command with ${message.author.tag}: Running ${client.prefix}${data[i]} ${fakeargsrun}`);
		const fakeMessageData = message;
		fakeMessageData.content = `${client.prefix}${data[i]} ${fakeargsrun}`;
		client.emit('message', fakeMessageData);
	}
	data.forEach((v, i) => setTimeout(myFunc, i * 3000, i));


};


module.exports.help = {
	name: 'test',
	description: 'test',
	usage: '<prefix>test',
	hideinhelp: true,
	requires: ['botowner'],
};