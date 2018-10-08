module.exports.run = async (client, message, args, ecoPool) => {
	const locations = ['urban', 'rural'];
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			if(!results[0]) return connection.query(`INSERT IGNORE INTO stats (userID, businessName, businessType, businessLocation, cash, bank, netWorth, employees, stocks) VALUES ('${message.author.id}', '', '', '', ${0}, ${0}, ${0}, ${0}, ${0})`) && connection.release() && message.reply('An error occurred, please run the command again');
			if(!results[0].businessName) return message.reply('Name your business first using **?bname**!') && connection.release();
			if(!results[0].businessType) return message.reply('Select your business type using **?btype**') && connection.release();
			if(!results[0].businessLocation) {
				if(!args[0] || !locations.includes(args[0].toLowerCase())) {
					return message.reply(`
That is an invalid location.

The types are as follows:\`\`\`css
[ Urban ] 
# You will locate your company in the busy city
[ Advantages ]
# Easy access to a lot of different services/businesses
# A lot of people live close to your business
[ Disadvantages ]
# You need to compete with lots of different companies
# Limited land and raw-materials \`\`\`   
\`\`\`css
[ Rural ]
# You will locate your company in the country-side
[ Advantages ]
# You have access to land and resources
# You do not compete with many different businesses
[ Disadvantages ]
# Not many people live close to your business
# You do not have access to lots of businesses nor services \`\`\`

**?blocate <location>**
`) && connection.release();
				}
				else {
					connection.query(`UPDATE stats SET businessLocation = '${args[0].toLowerCase()}' WHERE userID = '${message.author.id}'`);
					connection.query(`UPDATE stats SET bank = '${100}' WHERE userID = '${message.author.id}'`);
					message.reply('You have located your business in: **' + args[0].toLowerCase() + ' area**!\nFantastic, you have successfully setup your business and earned **$100**!\nNow, in the https://discord.gg/mG7eQtw server, run the **?help** command to find the commands to start running your business!\n\nAlso if you need any further help, there is a great community in that server to answer all of your questions! :joy_cat:');
					connection.release();
					if (error) throw error;
					const setupchannel = message.guild.channels.find(channel => channel.topic === message.author.id);
					if(setupchannel) {
						setTimeout(() => setupchannel.delete(), 50000);
						const role = message.guild.roles.get('498870271764070410');
						message.member.addRole(role).catch(console.error);
					} else {
						const theGuild = client.guilds.get('490999695422783489');
						const roleToAdd = theGuild.roles.get('498870271764070410');
						message.member.addRole(roleToAdd).catch(console.error);
					}
				}
			}
			else {
				message.reply('You already have already located your business in: **' + results[0].businessLocation + ' area** \nIf you would like to change it do **?breset**');
				connection.release();
				if (error) throw error;
			}
		});
	});
};

module.exports.help = {
	name: 'blocate',
	aliases: ['bloc'],
	hideinhelp: true,
};