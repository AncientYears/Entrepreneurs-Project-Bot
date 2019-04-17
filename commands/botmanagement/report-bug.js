const discord = require('discord.js');

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
	const bugembed = new discord.MessageEmbed().setTitle('BugReport');

	const messages = await message.channel.messages.fetch({ limit: 10 }).then(msgs => {return msgs.first(10).reverse();});
	bugembed.addField('Last 10 Messages',
		`\`\`\`
${messages.map(msg =>
		msg.author.tag + '\n' + msg.content.slice(0, 60).replace(/`/g, '^') + (msg.content.length < 60 ? '' : '...') + '\n').join('\n')}
    \`\`\``
	);
	bugembed.addField('Stats', '```' + require('util').inspect(stats).slice(0, 988) + (require('util').inspect(stats).length < 988 ? '' : '...') + '```');
	bugembed.addField('Args', args.join(' ').slice(0, 1000) + '\n-END OF REPORT-');
	client.channels.get('491301845705424911').send(bugembed);
	message.channel.send('Okay thank you, Report Sent!');
};

module.exports.help = {
	name: 'report-bug',
	usage: '<prefix>report-bug <info>',
	hideinhelp: false,
	aliases: ['bug-report', 'bug'],
};
