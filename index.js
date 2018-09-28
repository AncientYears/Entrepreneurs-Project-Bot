const discord = require('discord.js');
const fs = require('fs');
const mysql = require('mysql');
require('dotenv').config();
const client = new discord.Client({ disableEveryone: false });
const commands = new discord.Collection();

client.on('ready', async () => {
	console.log(`${client.user.username} is up and running!`);
});


const prefix = '?'; // temporary prefix here
client.on('message', async (message) => {
	if(message.author.bot || message.channel.type === 'dm') return;

	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
	if (!prefixRegex.test(message.content)) return;
	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const cmdname = args.shift().toLowerCase();
	const cmd = commands.get(cmdname) || commands.find(com => com.help.aliases && com.help.aliases.includes(cmdname));

	if(cmd) {
		cmd.run(client, message, args);
	}

});

fs.readdir('./commands/', (err, files) => {
	if(err) console.error(err);
	const jsfiles = files.filter(f => f.split('.').pop() === 'js');
	if(jsfiles.length <= 0) {
		console.log('No commands to load!');
		return;
	}
	console.log(`Loading ${jsfiles.length} commands...`);

	jsfiles.forEach((f, i) => {
		const cmdFiles = require(`./commands/${f}`);
		console.log(`Loading ${cmdFiles.help.name}!`);
		commands.set(cmdFiles.help.name, cmdFiles);
	});
});

const ecoPool = mysql.createPool({
	host: process.env.mysqlHost,
	user: process.env.mysqlUser,
	password: process.env.mysqlPassword,
	database: process.env.mysqlDatabase,
});

client.login(process.env.TOKEN);
