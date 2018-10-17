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

					console.log(`${i + 1} ${f} in category ${category} loaded!`); // => log that command got loaded
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

const prefix = '?'; // temporary prefix here


/**
 * Module to run and handle Commands!
 * @module commandhandler/run
 * @param {DiscordClient} client - Discord Client
 * @param {message} message - Message Object to handle Command in
 * @param {ecoPool} ecoPool - EcoPool Config
 */
module.exports.run = async (client, message, ecoPool) => { // commandhandler.run
	if(message.system) return;
	if(message.author.bot) return;

	ecoPool.getConnection(function(err, connection) {
		if(err) throw err;
		connection.query(`SELECT * FROM stats WHERE userID = '${message.author.id}'`, function(error, [stats]) {
			if (error) throw error;
			if(stats && stats.stocks) stats.stocks = JSON.parse(stats.stocks);
			const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
			if (!prefixRegex.test(message.content)) return;
			const [, matchedPrefix] = message.content.match(prefixRegex);
			const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
			const cmdname = args.shift().toLowerCase();
			const cmd = client.commands.get(cmdname) || client.commands.find(com => com.help.aliases && com.help.aliases.includes(cmdname));
			if(cmd) {
				message.channel.startTyping();
				if(cmd.help.disableindm == true)return message.channel.send('Sorry this Command is not yet supported!'); // check if command is supported in dm if not => return
				console.log(`[Ping:${Math.round(client.ping)}ms] ${cmd.help.name} request by ${message.author.username} @ ${message.author.id} `); // if command can run => log action
				if(cmd.help.requires) {
					if(cmd.help.requires.includes('botowner')) {
						if (!['193406800614129664', '211795109132369920'].includes(message.author.id)) return message.reply('This command cannot be used by you!'), console.log(`[Ping:${Math.round(client.ping)}ms] ${cmd.help.name} failed!: Not Bot Owner! `);
					}
					if(cmd.help.requires.includes('guild') && message.channel.type !== 'text') return message.channel.send('This command needs to be run in a guild!'), console.log(`[Ping:${Math.round(client.ping)}ms] ${cmd.help.name} failed!: Not Guild! `);
					if(cmd.help.requires.includes('dm') && message.channel.type !== 'dm') return message.channel.send('This command needs to be run in DMs!'), console.log(`[Ping:${Math.round(client.ping)}ms] ${cmd.help.name} failed!: Not DM! `);
					if (cmd.help.requires.includes('business')) {
						if(!stats || !stats.businessLocation.length) {
							console.log(`[Ping:${Math.round(client.ping)}ms] ${cmd.help.name} failed!: No Business! `);
							return message.channel.send(`Seems like you dont have a business yet! Create one by using **${prefix}setup**`);
						}
					}
				}
				cmd.run(client, message, args, ecoPool, connection, stats).catch(err => message.channel.send(err.message));
				if(cmd.help.category === 'indevelopment' && !['193406800614129664', '211795109132369920'].includes(message.author.id)) message.reply('Just a quick sidenote:\nThis Command is still indevelopment and might be unstable or even broken!');
			}
			connection.release();
			message.channel.stopTyping(true);
		});
	});
};