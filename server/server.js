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


const commandList = commands.map(props => props.help.hideinhelp ? '' : `## Command: ${props.help.name}\n${props.help.category ? `\tCategory: ${props.help.category}\n` : '' }${props.help.description ? `\tDescription: ${props.help.description}\n` : '' }${props.help.usage ? `\tUsage: ${format(props.help.usage)}\n` : '' }${props.help.aliases ? `\tAliases: [ ${props.help.aliases.join(', ')} ]\n` : '' }`).filter(data => data !== '');
const cmdTOC = commands.map(props => props.help.hideinhelp ? '' : `\t- [Command: ${props.help.name}](#command-${props.help.name.toLowerCase().replace(/ /g, '-')})`).filter(data => data !== '');
// Generate Page
const { readFileSync } = require('fs');
const showdown = require('showdown');
const converter = new showdown.Converter({ completeHTMLDocument: true, ghCompatibleHeaderId: true });
const zumzaData = converter.makeHtml('<link rel="stylesheet" href="./style.css">' + readFileSync('README.md', 'utf8').replace(/<run \?help>/g, commandList.join('\n')).replace(/\n\[cmdTOC\]: <> \(Addition Table of Contents for Commands\)/g, cmdTOC.join('\n')));
// const style = readFileSync('./server/style.css');
// Server Part
const express = require('express');
const app = express();

app.get('/style.css', function(req, res) {
	const style = readFileSync('./server/style.css');
	res.end(style);
});

app.get('/', function(req, res) {
	res.writeHead(200);
	res.end(zumzaData);
});

const port = process.env.PORT || 3000;
app.listen(port, console.log('Listening on ' + port));

function format(string) {
	string = string.replace(/<prefix>/g, process.env.prefix || '?');
	string = string.replace(/<mention>/g, ' @Zumza');
	string = string.replace(/<mainserverinvite>/g, 'https://discord.gg/p4ZhgNv');
	return string;
}
