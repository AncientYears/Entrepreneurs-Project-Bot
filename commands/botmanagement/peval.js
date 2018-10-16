/* eslint no-unused-vars: 0  */
const Discord = require('discord.js');
const request = require('snekfetch');


const cblockre = /(^```js)|(```$)/g;

module.exports.run = async (bot, message, args, ecoPool, connection, stats ) => {
	try {
		if(args[0] == 'secured') {
			args.shift();
			this.secured = true;
		}
		let content = args.join(' ');
		if(args[0] == 'haste') {
			if(!args[1]) return message.reply('to eval a haste upload your code to ' + bot.haste);
			const data = await request.get(bot.haste + '/raw/' + args[1]);
			content = data.body.toString();
		}
		

		if (cblockre.test(content)) {
			content = content.replace(cblockre, '').trim();
		}

		let evaled = eval(content);

		if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}
		await respond(message, evaled, bot, this.secured);
	}
	catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
	}
};


module.exports.help = {
	name: 'peval', 
  hideinhelp: true,
	aliases: ['pe'],
};

const header = (m, x) => {
	const H = `========== ${m.id} ==========`;
	console.log(H);
	if (x) {
		console.log(x);
		console.log(H);
	}
};

async function respond(message, result, bot, secured) {
	header(message);
	const wrapped = `${message.author}\n\`\`\`js\n${result}\n\`\`\``;
	if (wrapped.length >= 2000) {
		if(secured == true) return message.reply('message was too long in secured mode!');
		const key = await request.post(bot.haste + '/documents')
			.send(result)
			.then((r) => r.body.key);
		await message.reply(`**Output was too long and was uploaded to ${bot.haste}${bot.haste.substring(bot.haste.length - 1) == '/' ? '' : '/'}${key}.js**`);
		console.log('hasted', `${bot.haste}/${key}.js`);
	}
	else {
		await message.channel.send(wrapped);
		console.log(result);
	}
	header(message);
}
