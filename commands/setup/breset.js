module.exports.run = async (client, message, args, ecoPool, stats) => {
	if(stats && stats.businessName == '') {
		return message.reply(`You have not created a business yet, start off by naming one using **${client.prefix}setup**!`);
	}
	else {
		message.reply('Do you really want to reset your **WHOLE** business? (yes/no)');
		const filter = m => m.author.id === message.author.id && (m.content.toLowerCase() === 'yes' || m.content.toLowerCase() == 'no');
		const collector = message.channel.createMessageCollector(filter, { time: 20000, max:1 });

		collector.on('collect', m => {
			if(m.content.toLowerCase() === 'yes') {
				ecoPool.query(`DELETE FROM stats WHERE userID = '${message.author.id}'`);
				m.reply(`Your business was successfully reset, create a new one using **${client.prefix}setup**!`);
			}
			else if (m.content.toLowerCase() === 'no') {
				m.reply('Your business was not reset!');
			}
		});

		collector.on('end', collected => {
			if(!collected.size) message.reply('Timed out! Run the command again');
		});
	}
};
module.exports.help = {
	name: 'breset',
	hideinhelp: true,
};
