const discord = require('discord.js');
const mysql = require('mysql2/promise');
require('dotenv').config();
const commandhandler = require('./utils/commandhandler.js');
const client = new discord.Client({ disableEveryone: false });

client.commands = new discord.Collection();
client.prefix = process.env.prefix || '?';
commandhandler.start(client);
commandhandler.loadApi(client);


client.on('ready', async () => {
	console.log(`${client.user.username} is up and running!`);
	client.user.setPresence({ game: { name: client.prefix + ' | ' + 'Branch: ' + require(process.cwd() + '/utils/branch.js')() }, status: 'online' });
	console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
	client.format = function(string) {
		string = string.replace(/<prefix>/g, client.prefix);
		string = string.replace(/<mention>/g, client.user.toString());
		return string;
	};
});


client.on('message', async (message) => {
	commandhandler.run(client, message, ecoPool);
});

client.on('messageUpdate', async (oldmessage, message) => {
	commandhandler.run(client, message, ecoPool);
});

client.on('guildMemberAdd', async (member, message) => {
	if(member.user.bot || (member.guild.id !== '490999695422783489' && !message)) return;
	const stats = await client.api.getStats(member.id, ecoPool).then(data => data.data);
	if(stats.business.name)return;
	member.user.send(`
Welcome **${member.user.username}** to the Entrepreneurs server!
I'm Zumza, a distant cousin of Wumpus. I will be your main accountant during your stay here. I will give you tips and advice on how to grow your very own business!

Alright, first things first, What should we call your business? **(${client.prefix}bname <business name>)**
`).catch(async err => {
		if(err.code != 50007) throw new Error(`Could not send help DM to ${member.user.author.tag}.\n` + err);
		if(member.guild.id !== '490999695422783489') return message.channel.send('You have DMs disabled, please enable them or join https://discord.gg/mG7eQtw to get a setup-channel');
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

Alright, first things first, What should we call your business? **(${client.prefix}bname <business name>)**

`);
	});
});

process.on('unhandledRejection', (err) => { // OHH NO UNHANLED ERROR: NOTIFY ALL BOT DEVS
	console.error(err);
	if (err.name == 'DiscordAPIError' && err.message == '401: Unauthorized') return process.exit();
	(client.channels.get('526742123177836564') || client.channels.get('498776522153525258')).send(`
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
