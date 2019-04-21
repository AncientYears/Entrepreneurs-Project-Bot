// Command Info Generator
require('dotenv').config();
const { Collection } = require('discord.js');
const commands = new Collection();
const { statSync, readdirSync } = require('fs');
let errorc = 0;
const files = readdirSync('./commands/');
const jsfile = files.filter(f => f.split('.').pop() === 'js' && !statSync(process.cwd() + '/commands/' + f).isDirectory()); // get all .js files
const categorys = files.filter(f => statSync(process.cwd() + '/commands/' + f).isDirectory());
if (jsfile.length <= 0 && categorys.length <= 0) { // if no commands present
	console.log(' Couldn\'t find commands.'); // log no commands => close commandhandler and start client
	process.exit();
}

console.log('-------------------------------\nStarting to load Commands!');
jsfile.forEach((f, i) => { // if commands present
	try{
		const props = require(`../commands/${f}`); // => load each one

		console.log(`${i} ${f} loaded!`); // => log that command got loaded
		commands.set(props.help.name, props); // => add command to command list
	}
	catch(err) {
		errorc++;
		console.error(`${i} ${f} failed to load!\n${err}\n${err.stack}\n`);
	}
});

console.log('Commands loaded or none found!\n-------------------------------\nStarting to load Categorys!');
categorys.forEach(category =>{
	const catfiles = readdirSync('./commands/' + category).filter(f => f.split('.').pop() === 'js' && !statSync(process.cwd() + '/commands/' + category + '/' + f).isDirectory());
	catfiles.forEach((f, i) => {
		try{
			const props = require(`../commands/${category}/${f}`); // => load each one

			console.log(`${i} ${f} in category ${category} loaded!`); // => log that command got loaded
			props.help.category = category;
			commands.set(props.help.name, props); // => add command to command list
		}
		catch(err) {
			errorc++;
			console.error(`${i} ${f} failed to in ${category} load!\n${err}\n${err.stack}\n`);
		}
	});
	console.log(`-------------------------------\nCategory ${category} loaded or none found!\n-------------------------------`);
});


console.log('Categorys loaded or none found!\n-------------------------------');
console.log(`${commands.size} Commands loaded! ${errorc == 0 ? '' : `${errorc} Error occured!` }`);

const cmdTOC = commands.filter(cmd => !cmd.help.hideinhelp).filter(cmd => cmd.help.category == undefined).map(props => props.help.hideinhelp ? '' : `\t- [Command: ${props.help.name}](#command-${props.help.name.toLowerCase().replace(/ /g, '-')})`).filter(data => data !== '');
const commandList = commands.filter(cmd => cmd.help.category == undefined).map(props => props.help.hideinhelp || props.help.category ? '' : `## Command: ${props.help.name}\n${props.help.category ? `\tCategory: ${props.help.category}\n` : '' }${props.help.description ? `\tDescription: ${props.help.description}\n` : '' }${props.help.usage ? `\tUsage: ${format(props.help.usage)}\n` : `\tUsage: ${format(`<prefix>${props.help.name}`)}\n` }${props.help.aliases ? `\tAliases: [ ${props.help.aliases.join(', ')} ]\n` : '' }`).filter(data => data !== '');
categorys.forEach(category => {
	commandList.push(`## Category: ${category}`);
	cmdTOC.push(`\t- [Category: ${category}](#category-${category.toLowerCase().replace(/ /g, '-')})`);
	commands.filter(cmd => !cmd.help.hideinhelp).filter(cmd => cmd.help.category == category).map(props => [props.help.hideinhelp ? '' : `### Command: ${props.help.name}\n${props.help.description ? `\tDescription: ${props.help.description}\n` : '' }${props.help.usage ? `\tUsage: ${format(props.help.usage)}\n` : `\tUsage: ${format(`<prefix>${props.help.name}`)}\n` }${props.help.aliases ? `\tAliases: [ ${props.help.aliases.join(', ')} ]\n` : '' }`, props]).filter(data => data !== '')
		.forEach(cmd => {
			cmdTOC.push(`\t\t- [Command: ${cmd[1].help.name}](#command-${cmd[1].help.name.toLowerCase().replace(/ /g, '-')})`);
			commandList.push(cmd[0]);
		});
});
// Generate Page
const { readFileSync } = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter({ completeHTMLDocument: true, ghCompatibleHeaderId: true });
const zumzaData = converter.makeHtml('<link rel="stylesheet" href="./readme.css">' + readFileSync('README.md', 'utf8').replace(/<run \?help>/g, commandList.join('\n')).replace(/\n\[cmdTOC\]: <> \(Addition Table of Contents for Commands\)/g, cmdTOC.join('\n')));
// const style = readFileSync('./server/style.css');
// Server Part
const { join } = require('path');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', join(__dirname, '/views'));
app.use(express.static(join(__dirname, '/public')));

app.get('/', function(req, res) {
	res.writeHead(200);
	res.end(zumzaData);
});

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const auth = new Collection();

const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session({
	secret: process.env.CLIENT_SECRET,
	resave: false,
	saveUninitialized: false,
	store: new FileStore({ path: './server/sessions' }),
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new DiscordStrategy({
	clientID: CLIENT_ID,
	clientSecret: CLIENT_SECRET,
	callbackURL: '/login/callback',
	scope: ['identify', 'guilds'],
},
function(accessToken, refreshToken, profile, cb) {
	auth.set(profile.id, { profile, cb, refreshToken, accessToken });
	process.nextTick(function() {
		return cb(null, profile);
	});
}
));

app.get('/login',
	passport.authenticate('discord'));

app.get('/login/callback',
	passport.authenticate('discord', { failureRedirect: '/login' }),
	function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/stats');
	});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});
const getStats = require('../api/getStats');
app.get('/stats', checkAuth, async function(req, res) {
	const stats = await getStats(req.user.id, ecoPool).then(data => data.data);
	if(stats.business.name == '') {
		stats.business.name = 'None, create one!';
	}
	stats.business.name = stats.business.name.upperCaseFirst();
	stats.business.location = stats.business.location.upperCaseFirst();
	stats.business.type = stats.business.type.upperCaseFirst();
	stats.niceStock = [];
	for(const stock in stats.stocks) { stats.niceStock.push(`${stats.stocks[stock]} ${stock.replace(/_+/, ' ')} \n`);}
	if(stats.niceStock.length == 0) stats.niceStock.push('empty');
	res.render('stats.ejs', { stats: stats });
});

String.prototype.upperCaseFirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);

};
function checkAuth(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}

const port = process.env.PORT || 3000;
app.listen(port, console.log('Listening on ' + port));

function format(string) {
	string = string.replace(/<prefix>/g, process.env.prefix || '?');
	string = string.replace(/<mention>/g, ' @Zumza');
	string = string.replace(/<mainserverinvite>/g, 'https://discord.gg/p4ZhgNv');
	return string;
}
const { createPool } = require('mysql2/promise');
const ecoPool = createPool({
	host: process.env.mysqlHost,
	user: process.env.mysqlUser,
	password: process.env.mysqlPassword,
	database: process.env.mysqlDatabase,
});
