/* eslint no-unused-vars: 0  */
const Discord = require('discord.js');


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
		let content = args.join(' ');
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
	if (result.length >= 2000) {
		result = result.slice(0, 1950);
		result += ' \n...';
	}
	const wrapped = `${message.author}\n\`\`\`js\n${result}\n\`\`\``;
	await message.channel.send(wrapped);
	console.log(result);
	header(message);
}
