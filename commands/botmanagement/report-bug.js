const discord = require('discord.js');

/**
 * Command
 * @param {discord.client} client
 * @param {discord.Message} message
 * @param {Array} args
 * @param {*} ecoPool
 * @param {Object} stats
 */
module.exports.run = async (client, message, args, ecoPool, stats) => {
	const bugembed = new discord.RichEmbed().setTitle('BugReport');

	const messages = await message.channel.fetchMessages({ limit: 10 }).then(msgs => {return msgs.first(10).reverse();});
	bugembed.addField('Last 10 Messages',
		`\`\`\`
${messages.map(msg =>
		msg.author.tag + '\n' + msg.content.slice(0, 60) + (msg.content.length < 60 ? '' : '...') + '\n').join('\n')}
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
	requires: ['bug-report', 'bug'],
};
