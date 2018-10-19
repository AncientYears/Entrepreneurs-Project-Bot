const discord = require('discord.js');
const mysql = require('mysql');
require('dotenv').config();
const commandhandler = require('./utils/commandhandler.js');
const client = new discord.Client({ disableEveryone: false });

client.commands = new discord.Collection();
client.prefix = '?';
commandhandler.start(client);

client.on('ready', async () => {
	console.log(`${client.user.username} is up and running!`);
});


client.on('message', async (message) => {
	commandhandler.run(client, message, ecoPool);
});

client.on('messageUpdate', async (oldmessage, message) => {
	commandhandler.run(client, message, ecoPool);
});

client.on('guildMemberAdd', async (member) => {
	member.user.send(`
Welcome **${member.user.username}** to the Entrepreneurs server!
I'm Zumza, a distant cousin of Wumpus. I will be your main accountant during your stay here. I will give you tips and advice on how to grow your very own business!

Alright, first things first, What should we call your business? **(?bname <business name>)**
`).catch(async err => {
		if(err.code != 50007) throw new Error(`Could not send help DM to ${member.user.author.tag}.\n` + err);
		const overwrites = [{
			id: member.id,
			allowed: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
		},
		{
			id: member.guild.id,
			denied: ['VIEW_CHANNEL'],
		}];
		const channel = await member.guild.createChannel('setup-channel-' + member.id, 'text', overwrites, 'Member could not be dmed!');
		channel.setParent(member.guild.channels.find(category => category.type === 'category' && category.name === 'setup'));
		channel.setTopic(member.id);
		channel.send(`${member}, You had DMs, disabled, so lets just do it here!
Welcome **${member.user.username}** to the Entrepreneurs server!
I'm Zumza, a distant cousin of Wumpus. I will be your main accountant during your stay here. I will give you tips and advice on how to grow your very own business!

Alright, first things first, What should we call your business? **(?bname <business name>)**

`);
	});
});

process.on('unhandledRejection', (err) => { // OHH NO UNHANLED ERROR: NOTIFY ALL BOT DEVS
	console.error(err);
	if (err.name == 'DiscordAPIError' && err.message == '401: Unauthorized') return process.exit();
	client.channels.get('498776522153525258').send(`
\`\`\`xs
Error: ${err.name}
	${err.message}
	${err.stack}
	\`\`\`
	`);
});


const ecoPool = mysql.createPool({
	host: process.env.mysqlHost,
	user: process.env.mysqlUser,
	password: process.env.mysqlPassword,
	database: process.env.mysqlDatabase,
});


client.login(process.env.TOKEN);
