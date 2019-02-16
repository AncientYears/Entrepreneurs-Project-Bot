const discord = require('discord.js');

/**
 * Command
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {Array} args
 * @param {*} ecoPool
 * @param {Object} stats
 */
module.exports.run = async (client, message, args) => {
	const suggest = new discord.RichEmbed().setTitle('Suggestion').setDescription(args.join(' ')).setColor('RANDOM').setFooter(message.author.id);
	const hook = new discord.WebhookClient('546299239639154698', 'XRaxzclwO0rr07Mu2xXlkpjCtcdWByG6Q8ZxzAvxKF_2GJMWaOxJoJ4HV0R4RCP478bv');
	hook.send({ embeds: [suggest], username: message.author.tag, avatarURL: message.author.displayAvatarURL, disableEveryone: true });
	message.channel.send('Okay thank you, Suggestion Sent!');
};

module.exports.help = {
	name: 'suggest',
	usage: '<prefix>suggest <info>',
	hideinhelp: false,
	cooldown: '10 ms',
};
