const fs = require('fs');

function readFile(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (error, data) => {
			if (error) return reject(error);
			return resolve(data);
		});
	});
}

readFile('./example')
	.then(data => console.log(data))
    .catch(error => console.error(error));
    
    

