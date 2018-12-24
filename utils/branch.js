const fs = require('fs');

module.exports = () => {
	try{
		let data = fs.readFileSync('.git/HEAD', 'utf8');

		data = /ref: refs\/heads\/([^\n]+)/.exec(data.toString());
		return data[1] || 'master';
	}
	catch (err) {console.error(err.message);}

};