module.exports.run = async (client, message, args, ecoPool) => {
	const types = ['farm', 'factory', 'shop'];
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			if(!results[0].businessName) return message.reply('Name your business first using **?bname**!') && connection.release();
			if(!results[0].businessType) {
				if(!types.includes(args[0])) {
					return message.reply(`
That is an invalid business type.

The types are as follows:\`\`\`css
[ Farm ] 
# You are able to produce raw goods, e.g fruits, vegetables, meat, dairy products, etc.
[ Advantages ]
# No need to constantly buy stocks from other companies
# Companies rely on your materials, meaning you can set the prices
[ Disadvantages ]
# Your profits depend on quality of crops, season, weather etc.
# You have limited access to other companies so trade might be a bit difficult\`\`\`   
\`\`\`css
[ Factory ]
# You are able to buy raw goods from farms and process them to create something new
[ Advantages ]
# You can sell the new items you produce for more profit
# No limit to what items you can produce
[ Disadvantages ]
# You depend on farms and other raw material producers for profit
# You can lose money when demand drops for your product\`\`\`
\`\`\`css
[ Shop ]
# You buy stock for cheap and sell it for more to make a profit.
[ Advantages ]
# You can buy stock from both raw-material producers and factories
# You can advertise your shop to get more people to buy your stock
[ Disadvantages ]
# You may have to lower the price for customers to buy a certain item
# You are limited in wether/season conditions due to the fact that you need to buy stock from other companies.\`\`\`
`) && connection.release();
				}
				else {
					connection.query(`UPDATE stats SET businessType = '${args[0].toLowerCase()}' WHERE userID = '${message.author.id}'`);
					message.reply('You now have a **' + args[0].toLowerCase() + '** business! \nWhat a smart choice! \nNow, where do you want to locate your business? (Use **?blocate** to view the possible locations for companies!)');
					connection.release();
					if (error) throw error;
				}
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