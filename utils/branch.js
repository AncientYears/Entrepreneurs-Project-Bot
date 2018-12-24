const fs = require('fs');

module.exports = () => {
	try{
		let data = fs.readFileSync('.git/HEAD', 'utf8');

		data = /ref: refs\/heads\/([^\n]+)/.exec(data.toString());
		if(data[1]) return data[1];
		else return 'master';
	}
	catch (err) {console.error(err.message);}

};