module.exports.run = async (client, message, args, ecoPool, connection, stats) => {
	if(!stats.businessName) {
		const overwrites = [{
			id: message.member.id,
			allowed: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
		},
		{
			id: message.guild.id,
			denied: ['VIEW_CHANNEL'],
		}];
		const channel = await message.guild.createChannel('setup-channel-' + message.member.id, 'text', overwrites, 'Member could not be dmed!');
		channel.setParent(message.guild.channels.find(category => category.type === 'category' && category.name === 'setup'));
		channel.setTopic(message.member.id);
		channel.send(`
Welcome **${message.member.user.username}** to the Entrepreneurs server!
I'm Zumza, a distant cousin of Wumpus. I will be your main accountant during your stay here. I will give you tips and advice on how to grow your very own business!

Alright, first things first, What should we call your business? **(?bname <business name>)**

`);
		message.channel.send('Alright, first things first, What should we call your business? **(?bname <business name>)**');
	}
	else {
		message.reply('You already have a business named **' + stats.businessName + '** \nIf you would like to reset it do **?breset**');
	}
};

module.exports.help = {
	name: 'setup',
	hideinhelp: true,
	requires: ['guild'],
};
