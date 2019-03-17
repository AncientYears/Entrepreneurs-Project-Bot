const { Client, Message } = require('discord.js');
const { Pool } = require('mysql2');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 * @param {Array} args - Array with parsed args
 * @param {Pool} ecoPool - DataBase
 * @param {Object} stats - Object containing User Stats
 */
module.exports.run = async (client, message, args, ecoPool, stats) => {
	const locations = ['urban', 'rural'];
	if(!stats || !stats.business.name) return message.reply(`Name your business first using **${client.prefix}bname**!`);
	if(!stats || !stats.business.type) return message.reply(`Select your business type using **${client.prefix}btype**`);
	if(!stats.business.location) {
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

**${client.prefix}blocate <location>**
`);
		}
		else {
			stats.business.location = args[0].toLowerCase();
			ecoPool.query(`UPDATE stats SET business = '${JSON.stringify(stats.business)}' WHERE userID = '${message.author.id}'`);
			ecoPool.query(`UPDATE stats SET bank = '${100}' WHERE userID = '${message.author.id}'`);
			message.reply(`You have located your business in: **${args[0].toLowerCase()} area**!\nFantastic, you have successfully setup your business and earned **$100**!\nNow, in the https://discord.gg/VJk8jDm server, run the **${client.prefix}help** command to find the commands to start running your business!\n\nAlso if you need any further help, there is a great community in that server to answer all of your questions! :joy_cat:`);
			const theGuild = client.guilds.get('490999695422783489');
			const setupchannel = theGuild.channels.find(channel => channel.topic === message.author.id);
			if(setupchannel) {
				setTimeout(() => setupchannel.delete(), 50000);
			}
			const member = theGuild.members.get(message.author.id);
			if(!member) return;
			const roleToAdd = theGuild.roles.get('498870271764070410');
			if(!roleToAdd) throw Error('Couldnt get Role!');
			member.addRole(roleToAdd);
		}
	}
	else {
		message.reply(`You already have already located your business in: **${stats.business.location} area** \nIf you would like to change it do **${client.prefix}breset**`);
	}
};

module.exports.help = {
	name: 'blocate',
	aliases: ['bloc'],
	hideinhelp: true,
};