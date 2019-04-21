const { Client, Message, MessageEmbed, WebhookClient } = require('discord.js');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 */
module.exports.run = async (client, message, args) => {
	if(!args.length) return message.channel.send('?suggest <suggestion>');
	const suggest = new MessageEmbed().setDescription(args.join(' ')).setColor('RANDOM').setAuthor('Suggestion', client.user.displayAvatarURL, `https://discordapp.com/users/${message.author.id}`);
	const hook = new WebhookClient('546299239639154698', 'XRaxzclwO0rr07Mu2xXlkpjCtcdWByG6Q8ZxzAvxKF_2GJMWaOxJoJ4HV0R4RCP478bv');
	const msg = await hook.send({ embeds: [suggest], username: message.author.tag, avatarURL: message.author.displayAvatarURL, disableEveryone: true });
	await client.guilds.get('490999695422783489').channels.get('503618118166511626').messages.get(msg.id).react(client.emojis.find(emoji => emoji.name == 'zumzaAgree').id);
	await client.guilds.get('490999695422783489').channels.get('503618118166511626').messages.get(msg.id).react(client.emojis.find(emoji => emoji.name == 'zumzaDisagree').id);
	message.channel.send('Okay thank you, Suggestion Sent!');
};

module.exports.help = {
	name: 'suggest',
	usage: '<prefix>suggest <info>',
	hideinhelp: false,
	cooldown: '2 min',
	requires: ['embed'],
};
