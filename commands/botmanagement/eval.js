/* eslint no-unused-vars: 0  */
const Discord = require('discord.js');
const request = require('snekfetch');


const cblockre = /(^```js)|(```$)/g;

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
	try {
		if(args[0] == 'secured') {
			args.shift();
			this.secured = true;
		}
		else {this.secured = false;}

		let content = args.join(' ');
		if(args[0] == 'haste') {
			if(!args[1]) return message.reply('To eval a haste upload your code to ' + client.haste);
			const data = await request.get(client.haste + '/raw/' + args[1]);
			content = data.body.toString();
		}


		if (cblockre.test(content)) {
			content = content.replace(cblockre, '').trim();
		}

		let evaled = eval(content);

		if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}
		await respond(message, evaled, client, this.secured);
	}
	catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
	}
};


module.exports.help = {
	name: 'eval',
	hideinhelp: true,
	aliases: ['e'],
	requires: ['botowner'],
	cooldown: '1ms',
};

const header = (m, x) => {
	const H = `========== ${m.id} ==========`;
	console.log(H);
	if (x) {
		console.log(x);
		console.log(H);
	}
};

async function respond(message, result, client, secured) {
	header(message);
	const wrapped = `${message.author}\n\`\`\`js\n${result}\n\`\`\``;
	if (wrapped.length >= 2000) {
		if(secured == true) return message.reply('message was too long in secured mode!');
		const key = await request.post(client.haste + '/documents')
			.send(result)
			.then((r) => r.body.key);
		await message.reply(`**Output was too long and was uploaded to ${client.haste}${client.haste.substring(client.haste.length - 1) == '/' ? '' : '/'}${key}.js**`);
		console.log('hasted', `${client.haste}/${key}.js`);
	}
	else {
		await message.channel.send(wrapped);
		console.log(result);
	}
	header(message);
}
