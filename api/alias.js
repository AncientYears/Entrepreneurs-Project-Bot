const { Collection } = require('discord.js');
const aliases = new Collection([
	[
		'potato',
		{
			main: 'potato',
			aliases: ['potatoes'],

		},
	],
	[
		'carrot_seed',
		{
			main: 'carrot_seed',
			aliases: ['carrot_seeds'],

		},
	],
	[
		'corn_seed',
		{
			main: 'corn_seed',
			aliases: ['corn_seeds'],

		},
	],
]);
/**
 * Function to check Aliases
 *
 * @param {string} alias - The String to Check against if it is an Alias
 * @returns {string} - The main Item
 */
function checkAlias(alias) {
	const Aliases = aliases.get(alias) || aliases.find(x=> x.aliases.includes(alias)) || { main: alias, aliases: [] };
	return Aliases.main;
}
module.exports.checkAlias = checkAlias;
module.exports.aliases = aliases;