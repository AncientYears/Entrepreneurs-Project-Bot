const { Client, Collection } = require('discord.js');
const { createPool } = require('mysql2/promise');
require('dotenv').config();
const commandhandler = require('./utils/commandhandler.js');
const client = new Client({ disableEveryone: false });

client.commands = new Collection();
client.prefix = process.env.prefix || '?';
commandhandler.start(client);
commandhandler.loadApi(client);


client.on('ready', async () => {
	console.log(`${client.user.username} is up and running!`);
	const branch = require(process.cwd() + '/utils/branch.js')();
	if(branch == 'master' && client.user.id != '491313910620749834') client.branch = 'beta'; else client.branch = branch;
	client.user.setPresence({ activity: { name: `${client.prefix} | Branch: ${client.branch}` }, status: 'online' });
	console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
	client.format = function(string) {
		string = string.replace(/<prefix>/g, client.prefix);
		string = string.replace(/<mention>/g, client.user.toString());
		string = string.replace(/<mainserverinvite>/g, 'https://discord.gg/p4ZhgNv');
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
	if(!message && member.guild.large) return;
	const stats = await client.zumzaApi.getStats(member.id, ecoPool).then(data => data.data);
	if(!member.roles.some(role => role.name === 'Entrepreneur-zumza')) {
		const roleToAdd = member.guild.roles.find(role => role.name === 'Entrepreneur-zumza');
		if(stats && stats.business.location && roleToAdd) member.roles.add(roleToAdd);
	}
	if(member.user.bot || (member.guild.id !== '490999695422783489' && !message)) return;
	if(stats.business.name)return;
	member.user.send(`
Welcome **${member.user.username}** to the Entrepreneurs server!
I'm Zumza, a distant cousin of Wumpus. I will be your main accountant during your stay here. I will give you tips and advice on how to grow your very own business!

Alright, first things first, What should we call your business? **(${client.prefix}bname <business name>)**
`).catch(async err => {
		if(err.code != 50007) throw new Error(`Could not send help DM to ${member.user.author.tag}.\n` + err);
		if(member.guild.id !== '490999695422783489') return message.channel.send('You have DMs disabled, please enable them or join <mainserverinvite> to get a setup-channel');
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

	if(err.name == 'DiscordAPIError') {
		let addInfo = 'None Found!';
		if(err.path !== undefined) {
			const split = err.path.split('/');
			if(split[3] == 'channels') {
				const channel = client.channels.get(split[4]);
				if(channel) {
					addInfo = `Additional Debug Info:\n\tChannel: ${channel.name ? channel.name : 'Unknown'}\n\tGuild: ${channel.guild ? channel.guild.name : 'Unknown'}`;
				}
			}
			if(split[3] == 'guilds') {
				const guild = client.guilds.get(split[4]);
				if(guild) {
					addInfo = `Additional Debug Info:\n\tGuild: ${guild.name ? guild.name : 'Unknown'}`;
				}
			}
		}
		return (client.channels.get('526742123177836564') || client.channels.get('498776522153525258')).send(`
\`\`\`js
Error: ${require('util').inspect(err).slice(0, 1800)}

	${addInfo}
\`\`\`
		`);
	}

	return (client.channels.get('526742123177836564') || client.channels.get('498776522153525258')).send(`
\`\`\`xs
Error: ${err.name}
	${err.message}
	${err.stack}
	\`\`\`
	`);
});


const ecoPool = createPool({
	host: process.env.mysqlHost,
	user: process.env.mysqlUser,
	password: process.env.mysqlPassword,
	database: process.env.mysqlDatabase,
});


client.login(process.env.TOKEN);
