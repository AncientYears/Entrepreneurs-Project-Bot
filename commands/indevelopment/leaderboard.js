module.exports.run = async (client, message, args, ecoPool) => {
	const [data] = await ecoPool.query('select * from stats ORDER BY cash + bank DESC');
	const mydata = data.map((d, pos) => ({ cash: (d.cash + d.bank), pos: (pos + 1), userID: d.userID })).find(stats => stats.userID === message.author.id);
    const topfive = data.slice(0, 5).map((d, pos) => (client.users.get(d.userID) === undefined ? d.userID : client.users.get(d.userID).tag) + ' \t ' + (d.cash + d.bank) + ' ' + (pos + 1));
};

module.exports.help = {
	name: 'leaderboard',
	hideinhelp: false,
	requires: [],
};