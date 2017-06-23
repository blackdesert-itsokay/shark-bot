const GoogleSpreadsheet = require('google-spreadsheet');
const doc = new GoogleSpreadsheet('192_B6x7vGp-X3JQIaPdGc3EGprsVSZJHrNYE6S1fVgM');
const creds = require('../resources/client_secret.json');

let sheetService = {
	column_name: '家門名稱', column_class: '出戰職業', column_level: '等級',
	column_attack: '攻擊力', column_awakening: '覺醒攻擊力', column_defense: '防禦力',
	getPlayer: (name, callback) => {
		doc.useServiceAccountAuth(creds, function (err) {
			doc.getRows(1, function (err, rows) {
				var row;

				for (var i = 0; i < rows.length; i++) {
					if (name == rows[i][sheetService.column_name]) {
						row = rows[i];
						break;
					}
				}

				callback(row);
			});
		});
	},
	updatePlayer: (name, column, value, callback) => {
		doc.useServiceAccountAuth(creds, function (err) {
			doc.getRows(1, function (err, rows) {
				var row;

				for (var i = 0; i < rows.length; i++) {
					if (name == rows[i][sheetService.column_name]) {
						rows[i][column] = value;
						rows[i].save();
						row = rows[i];
						break;
					}
				}

				callback(row);
			});
		});
	}
}

module.exports = sheetService;