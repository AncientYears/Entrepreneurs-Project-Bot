/* eslint no-unused-vars:0 */
const cblockre = /(^```js)|(```$)/g;
const Discord = require('discord.js');
module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if (!['193406800614129664', '211795109132369920'].includes(message.author.id)) return message.reply('This command cannot be used by you!');
	try {
		let content = args.join(' ');
		if (cblockre.test(content)) {
			content = content.replace(cblockre, '').trim();
		}
		let evaled = eval(content);
		if (typeof evaled !== 'string') {
			evaled = require('util').inspect(evaled);
		}
		message.channel.send(evaled, { code: 'js' });
	}
	catch (err) {
		message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
	}
};
module.exports.help = {
	name: 'eval',
	description: 'Evals',
	usage: 'eval <<>>',
	aliases: ['e'], hideinhelp: true,
};
