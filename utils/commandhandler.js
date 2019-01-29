const fs = require('fs');

/**
 * Module to run and handle Commands!
 * @module commandhandler/run
 * @param {client} client - Discord Client
 */
module.exports.start = (client) => { // load commands from command dir
	let errorc = 0;
	fs.readdir('./commands/', (err, files) => { // read dir
		if(err) { // err =>
			if (err.errno == -4058) { // err code = -4058 => dir not present
				fs.mkdirSync('./commands'); // => make dir
				console.log('Command folder was not found! Creating ./commands/ \n Please restart Bot!'); // => log
				return process.exit(); // => return
			}
			else{ // Unknow Error =>
				console.log(err); // => log
				return process.exit(); // => exit
			}
		}

		const jsfile = files.filter(f => f.split('.').pop() === 'js' && !fs.statSync(process.cwd() + '/commands/' + f).isDirectory()); // get all .js files
		const categorys = files.filter(f => fs.statSync(process.cwd() + '/commands/' + f).isDirectory());
		if (jsfile.length <= 0 && categorys.length <= 0) { // if no commands present
			return console.log(' Couldn\'t find commands.'); // log no commands => close commandhandler and start client
		}

		console.log('-------------------------------\nStarting to load Commands!');
		jsfile.forEach((f, i) => { // if commands present
			try{
				const props = require(`../commands/${f}`); // => load each one

				console.log(`${i} ${f} loaded!`); // => log that command got loaded
				client.commands.set(props.help.name, props); // => add command to command list
			}
			catch(err) {
				errorc++;
				console.error(`${i} ${f} failed to load!\n${err}\n${err.stack}\n`);
			}
		});

		console.log('Commands loaded or none found!\n-------------------------------\nStarting to load Categorys!');
		categorys.forEach(category =>{
			const catfiles = fs.readdirSync('./commands/' + category).filter(f => f.split('.').pop() === 'js' && !fs.statSync(process.cwd() + '/commands/' + category + '/' + f).isDirectory());
			catfiles.forEach((f, i) => {
				try{
					const props = require(`../commands/${category}/${f}`); // => load each one

					console.log(`${i} ${f} in category ${category} loaded!`); // => log that command got loaded
					props.help.category = category;
					client.commands.set(props.help.name, props); // => add command to command list
				}
				catch(err) {
					errorc++;
					console.error(`${i} ${f} failed to in ${category} load!\n${err}\n${err.stack}\n`);
				}
			});
			console.log(`-------------------------------\nCategory ${category} loaded or none found!\n-------------------------------`);
		});


		console.log('Categorys loaded or none found!\n-------------------------------');
		console.log(`${client.commands.size} Commands loaded! ${errorc == 0 ? '' : `${errorc} Error occured!` }`);
	}); // => close commandhandler and start client
};

/**
 * Module to load and handle API!
 * @module commandhandler/loadApi
 * @param {client} client - Discord Client
 */
module.exports.loadApi = (client) => { // load commands from command dir
	client.api = {};
	fs.readdir('./api/', (err, files) => {
		if (err) return console.error(err);
		files = files.filter(f => f.split('.').pop() === 'js');
		files.forEach(file => {
			const api = require(`../api/${file}`);
			const apiName = file.split('.')[0];
			client.api[apiName] = api;
		});
	});
};
const ms = require('ms');


/**
 * Module to run and handle Commands!
 * @module commandhandler/run
 * @param {DiscordClient} client - Discord Client
 * @param {message} message - Message Object to handle Command in
 * @param {ecoPool} ecoPool - EcoPool Config
 */
module.exports.run = async (client, message, ecoPool) => { // commandhandler.run
	if (message.system) return;
	if (message.author.bot) return;
	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${client.prefix})\\s*`);
	if (!prefixRegex.test(message.content)) return;
	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const cmdname = args.shift().toLowerCase();
	const cmd = client.commands.get(cmdname) || client.commands.find(com => com.help.aliases && com.help.aliases.includes(cmdname));
	if (cmd) {
		message.channel.startTyping();
		if (cmd.help.disableindm == true) return message.channel.send('Sorry this Command is not yet supported!'), message.channel.stopTyping(true); // check if command is supported in dm if not => return
		console.log(`[Ping:${Math.round(client.ping)}ms] ${cmd.help.name} request by ${message.author.username} @ ${message.author.id} `); // if command can run => log action
		const stats = await client.api.getStats(message.author.id, ecoPool).then(data => data.data);
		if (cmd.help.requires) {
			if (cmd.help.requires.includes('botowner')) if (!['193406800614129664', '211795109132369920'].includes(message.author.id)) return message.reply('This command cannot be used by you!'), console.log(`[Ping:${Math.round(client.ping)}ms] ${cmd.help.name} failed!: Not Bot Owner! `), message.channel.stopTyping(true);
			if (cmd.help.requires.includes('guild') && message.channel.type !== 'text') return message.channel.send('This command needs to be run in a guild!'), console.log(`[Ping:${Math.round(client.ping)}ms] ${cmd.help.name} failed!: Not Guild! `), message.channel.stopTyping(true);
			if (cmd.help.requires.includes('dm') && message.channel.type !== 'dm') return message.channel.send('This command needs to be run in DMs!'), console.log(`[Ping:${Math.round(client.ping)}ms] ${cmd.help.name} failed!: Not DM! `), message.channel.stopTyping(true);
			if (cmd.help.requires.includes('business') && (!stats || !stats.businessLocation.length)) return message.channel.send(`Seems like you dont have a business yet! Create one by using **${client.prefix}setup**`), console.log(`[Ping:${Math.round(client.ping)}ms] ${cmd.help.name} failed!: No Business! `), message.channel.stopTyping(true);
		}
		if (((cmd.help.category === 'indevelopment' && !['193406800614129664', '211795109132369920'].includes(message.author.id)) && !['490999695422783489', '511221411805790209'].includes(message.guild.id))) return message.reply('This Command is indevelopment! Please join <> and use it there until it is finished!'), message.channel.stopTyping(true);
		const now = Date.now();
		const cooldownAmount = ms(cmd.help.cooldown || '5s');
		if (!stats.cooldowns[cmd.help.name]) stats.cooldowns[cmd.help.name] = now - cooldownAmount;
		const cooldown = stats.cooldowns[cmd.help.name];
		const expirationTime = cooldown + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = ms(expirationTime - now, {
				long: true,
			});
			return message.reply(`please wait \`${timeLeft}\` before reusing the \`${cmd.help.name}\` command.`), message.channel.stopTyping(true);
		}
		stats.cooldowns[cmd.help.name] = now;
		await ecoPool.query(`UPDATE stats SET cooldowns = '${JSON.stringify(stats.cooldowns)}' WHERE userID = '${message.author.id}'`);
		cmd.run(client, message, args, ecoPool, stats);
		if (cmd.help.category === 'indevelopment' && !['193406800614129664', '211795109132369920'].includes(message.author.id)) message.reply('Just a quick sidenote:\nThis Command is still indevelopment and might be unstable or even broken!');
		message.channel.stopTyping(true);
	}
};
