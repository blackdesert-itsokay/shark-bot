const http = require('http');

let httpRequest = (url, callback) => {
	try {
		http.get(url, function (response) {
			var body = '';

			response.on('data', function (chunk) {
				body += chunk;
			});

			response.on('end', function () {
				callback(JSON.parse(body));
			});

		}).on('error', function (err) {
			console.log(`\nhttp request ${url} 失敗\n${err.stack}`);
		});
	} catch (err) {
		console.log(`\無法判斷網域名稱 ${url} \n${err.stack}`);
	}
};

module.exports = httpRequest;