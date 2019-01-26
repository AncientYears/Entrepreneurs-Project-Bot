module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(!message.member) return message.channel.send('This is not a Guild!');
	if(message.member.roles.some(role => role.name === 'Entrepreneur-zumza')) return message.channel.send('You already have the rule O.o!').then(msg => msg.delete(5000));
	if(!stats || !stats.businessName) return message.reply(`Name your business first using **${client.prefix}bname**!`);
	if(!stats || !stats.businessType) return message.reply(`Select your business type using **${client.prefix}btype**`);
	if(!stats.businessLocation) {return message.reply(`Select your business type using **${client.prefix}blocate**`);}
	else {
		const roleToAdd = message.guild.roles.find(role => role.name === 'Entrepreneur-zumza');
		if(!roleToAdd) return message.channel.send('This guild has no role named `Entrepreneur-zumza`! But this one has for sure! https://discord.gg/mG7eQtw');
		message.member.addRole(roleToAdd);
		message.delete(5000).catch(() => null);
		message.reply('Here is your Role!').then(msg => msg.delete(5000));
	}
};

module.exports.help = {
	name: 'getrole',
	usage: '<prefix>getrole',
	hideinhelp: false,
};
