module.exports.run = async (client, message, args, ecoPool) => {
	const types = ['Farm', 'Factory', 'Shop'];
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			if(!results[0].businessName) return message.reply('Name your business first using **?bname**!') && connection.release();
			if(!results[0].businessType) {
				if(!types.includes(args[0])) {
					return message.reply(`
That is an invalid business type.

The types are as follows:
[1] **Farm** - You are able to produce raw goods, e.g fruits, vegetables, meat, dairy products, etc.
**Advantages:**
- No need to constantly buy stocks from other companies
- Companies rely on your materials, meaning you can set the prices
**Disadvantages:**
- Your profits depend on quality of crops, season, weather etc.
- You have limited access to other companies so trade might be a bit difficult   
`) && connection.release();
				}
				connection.query(`UPDATE stats SET businessType = ${args[0].toLowerCase()} WHERE userID = '${message.author.id}'`);
				message.reply('You now have a **' + args[0].toLowerCase() + '** business! \nWhat a smart choice! \nNow, where do you want to locate your business? (Use **?blocate** to view the possible locations for companies!)');
				connection.release();
				if (error) throw error;
			}
			else {
				message.reply('You already have a business type which is: **' + results[0].businessType + '** \nIf you would like to change it do **?bnewtype <type>**');
				connection.release();
				if (error) throw error;
			}
		});
	});
};

module.exports.help = {
	name: 'btype',
};