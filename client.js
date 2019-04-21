const { Client, Collection, MessageEmbed } = require('discord.js');
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

const inline = true;
client.on('guildCreate', guild => {
	const guildEmbed = new MessageEmbed().setTitle('Joined new Guild').setColor('GREEN').addField('Guild', guild.name, inline).addField('Size', guild.memberCount, inline).addField('Bots', guild.members.filter(member => member.user.bot).size, inline).addField('Owner', guild.owner ? guild.owner.user.tag : (client.users.get(guild.ownerID) ? client.users.get(guild.ownerID).tag : guild.ownerID));
	client.channels.get('569264057165545480').send(guildEmbed);
});

client.on('guildDelete', guild => {
	const guildEmbed = new MessageEmbed().setTitle('Left Guild').setColor('RED').addField('Guild', guild.name, inline).addField('Size', guild.memberCount, inline).addField('Bots', guild.members.filter(member => member.user.bot).size, inline).addField('Owner', guild.owner ? guild.owner.user.tag : (client.users.get(guild.ownerID) ? client.users.get(guild.ownerID).tag : guild.ownerID));
	client.channels.get('569264057165545480').send(guildEmbed);
});


client.on('guildMemberAdd', async (member, message) => {
	if(client.user.id !== '491313910620749834') return;
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
		const channel = await member.guild.channels.create('setup-channel-' + member.id, 'text', overwrites, 'Member could not be dmed!');
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
	if(client.user.id !== '491313910620749834') return;
	if (err.name == 'DiscordAPIError' && err.message == '401: Unauthorized') return process.exit();
	const addInfo = getDebugInfo(err);
	console.error(addInfo);
	return client.channels.get('498776522153525258').send(`
\`\`\`js
Error: ${require('util').inspect(err).slice(0, 1800)}

	${addInfo}
\`\`\`
		`);

});

function getDebugInfo(err) {
	let addInfo = 'None Found!';
	if(err.name !== 'DiscordAPIError') return addInfo;
	if(err.path !== undefined) {
		if(!err.path.startsWith('/api/v7')) err.path = '/api/v7' + err.path;
		const arr = err.path.split('/');
		addInfo += '\nAdditional Debug Info: ';
		if(arr[3] == 'channels') {
			const channel = client.channels.get(arr[4]);
			if(channel) {
				if(channel.type === 'dm') {
					addInfo += `\nDMChannel: ${channel.recipient.id}:${channel.recipient.tag}`;
				}
				else if (channel.guild) {
					addInfo += `\nGuildChannel: ${channel.id}:${channel.name}\n\t${channel.guild.id}:${channel.guild.name}`;
				}
			}
		}
		if(arr[3] == 'guilds') {
			const guild = client.guilds.get(arr[4]);
			if(guild) {
				addInfo += `\nGuild: ${guild.id}:${guild.name}`;
			}
		}
		if(!arr[5])	return addInfo;

		if(arr[5] == 'permissions') {
			const channel = client.channels.get(arr[4]);
			if(channel) {
				const role = channel.guild.roles.get(arr[6]);
				if(role) {
					addInfo += `\nRole: ${role.id}:${role.name}`;
				}
			}
		}
		if(arr[5] == 'messages') {
			const channel = client.channels.get(arr[4]);
			if(channel) {
				const msg = channel.messages.get(arr[6]);
				if(msg) {
					addInfo += `\nMessage: ${msg.content}${msg.id}`;
					if(msg.author) {
						addInfo += `\n\tUser: ${msg.author.username}-${msg.author.id}`;
					}
					if(msg.guild) {
						addInfo += `\n\tGuild: ${msg.guild.name}-${msg.guild.id}`;
					}
				}
			}
		}
		return addInfo;
	}
}

const ecoPool = createPool({
	host: process.env.mysqlHost,
	user: process.env.mysqlUser,
	password: process.env.mysqlPassword,
	database: process.env.mysqlDatabase,
});


client.login(process.env.TOKEN);
