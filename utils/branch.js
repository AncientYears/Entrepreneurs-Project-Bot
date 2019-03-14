const fs = require('fs');
/**
 * @returns {string} - Returns Name of current Branch.
 */
module.exports = () => {
	try{
		let data = fs.readFileSync('.git/HEAD', 'utf8');

		data = /ref: refs\/heads\/([^\n]+)/.exec(data.toString());
		if(data[1]) return data[1];
		else return process.env.branch || 'master';
	}
	catch (err) {
		console.error(err.message);
		return process.env.branch || 'master';
	}

};