const discord = require('discord.js');
const mysql = require('mysql');
require('dotenv').config();
const commandhandler = require('./utils/commandhandler.js');
const client = new discord.Client({ disableEveryone: false });

client.commands = new discord.Collection();
commandhandler.start(client);

client.on('ready', async () => {
	console.log(`${client.user.username} is up and running!`);
});


client.on('message', async (message) => {
	if(message.system) return;
	if(message.author.bot) return;

	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, results, fields) {
			if(!results.length) {
				connection.query(`INSERT IGNORE INTO stats (userID, businessName, businessType, businessLocation, cash, bank, netWorth, employees, stocks) VALUES ('${message.author.id}', '', '', '', ${0}, ${0}, ${0}, ${0}, ${0})`);
				connection.release();
				if (error) throw error;
			}
			else {
				connection.release();
				if (error) throw error;
			}
		});
	});

	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
	if (!prefixRegex.test(message.content)) return;
	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const cmdname = args.shift().toLowerCase();
	const cmd = client.commands.get(cmdname) || client.commands.find(com => com.help.aliases && com.help.aliases.includes(cmdname));

	if(cmd) {
		cmd.run(client, message, args, ecoPool);
	}
	commandhandler.run(client, message, ecoPool);
});

client.on('messageUpdate', async (oldmessage, message) => {
	commandhandler.run(client, message, ecoPool);
});

client.on('guildMemberAdd', (member) => {
	ecoPool.getConnection(function(err, connection) {
		connection.query(`SELECT * FROM stats WHERE userID = '${member.id}'`, function(error, results, fields) {
			if(!results.length) {
				connection.query(`INSERT IGNORE INTO stats (userID, businessName, businessType, businessLocation, cash, bank, netWorth, employees, stocks) VALUES ('${member.id}', '', '', '', ${0}, ${0}, ${0}, ${0}, ${0})`);
				connection.release();
				if (error) throw error;
				member.user.send(`
Welcome **${member.user.username}** to the Entrepreneurs server!
I'm Zumza, a distant cousin of Wumpus. I will be your main accountant during your stay here. I will give you tips and advice on how to grow your very own business!

Alright, first things first, What should we call your business? **(?bname <business name>)**
`).catch(err => {
					if(err.code != 50007) throw new Error(`Could not send help DM to ${member.user.author.tag}.\n` + error);
					member.addRole(member.guild.roles.find(role => role.name.toLowerCase() === 'unverified'));
					member.guild.channels.find(channel => channel.name.toLowerCase() == 'unverified').send(`${member}, You had DMs, disabled, so lets just do it here!
Welcome **${member.user.username}** to the Entrepreneurs server!
I'm Zumza, a distant cousin of Wumpus. I will be your main accountant during your stay here. I will give you tips and advice on how to grow your very own business!

Alright, first things first, What should we call your business? **(?bname <business name>)**

`);
				});
				return;
			}
			else {
				connection.release();
				if (error) throw error;
				return;
			}
		});
		return;
	});
});

const ecoPool = mysql.createPool({
	host: process.env.mysqlHost,
	user: process.env.mysqlUser,
	password: process.env.mysqlPassword,
	database: process.env.mysqlDatabase,
});


client.login(process.env.TOKEN);
