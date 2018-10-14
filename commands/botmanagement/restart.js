const Discord = require('discord.js');
const color = require(process.cwd() + '/config/color.json');

module.exports.run = async (client, message) => {
	if (!['193406800614129664', '211795109132369920'].includes(message.author.id)) return message.reply('This command cannot be used by you!');
	const restartembed = new Discord.RichEmbed()
		.setColor(color.restart)
		.setThumbnail(client.user.avatarURL)
		.setTitle('Status')
		.setDescription(`Please wait ${client.user.username} is restarting`);
	message.channel.send(restartembed);
	client.destroy()
		.then(() => client.login(process.env.TOKEN));
	restartembed.setDescription(`${client.user.username} has restarted!`);
	client.once('ready', () => {
		message.channel.send(restartembed);
	});
};

module.exports.help = {
	name: 'restart',
	description: 'Restarts the Bot',
	usage: 'restart',
};