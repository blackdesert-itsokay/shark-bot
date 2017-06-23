const fs = require("fs");

let file = {
	read: (dir, callback) => {
		fs.readFile(dir, 'utf8', (err, data) => {
			if (err) {
				file.table = {};
				console.log('讀取失敗\n' + err.stack);
			} else {
				file.table = JSON.parse(data);
				console.log('讀取成功');
			}

			callback(err, file.table);
		});
	},
	write: (dir, jsonObject, callback) => {
		var json;
		// convert jsonObject back to json
		if (jsonObject == null) json = JSON.stringify(file.table);
		else {
			file.table = jsonObject;
			json = JSON.stringify(jsonObject);
		}
		// write it back to json file
		fs.writeFile(dir, json, 'utf8', (err) => {
			if (err)
				console.log('寫入失敗\n' + err.stack);
			else {
				console.log('寫入成功');
				callback();
			}
		});
	},
	table: {},
	init: (dir) => {
		file.read(dir);
	}
}

module.exports = file;