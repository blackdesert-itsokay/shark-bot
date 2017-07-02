const sheetService = require('../util/sheetService');
const file = require('../util/file');

function isContains(json, value) {
  let contains = false;
  Object.keys(json).some(key => {
    contains = typeof json[key] === 'object' ? _isContains(json[key], value) : json[key] === value;
    return contains;
  });
  return contains;
}

function classValid(text, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (text == arr[i].text) return true;
  }

  return false;
}

function levelValid(text, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (text == arr[i].text) return true;
  }

  return false;
}

function attackDefenseValid(text, max) {
  try {
    var n = parseInt(text, 10);
    var n_max = parseInt(max, 10);

    if (n >= 0 && n <= n_max) return true;
    else return false;
  } catch (err) {
    return false;
  }
}

let update = {
  command: ["更新", "更改"],
  help: "更新自己的資訊，如：職業、攻擊力、防禦力等",
  err_msg: "請參考指令 !更新 [職業/等級/攻擊/覺醒攻擊/防禦] [值]",
  func: (bot, message, args) => {
    // sheetService.column_name: '家門名稱', column_class: '出戰職業', column_level: '等級',
    // column_attack: '攻擊力', column_awakening: '覺醒攻擊力', column_defense: '防禦力'

    if (args.length != 2) {
      message.channel.send(`${message.author} 輸入太少或太多項目了\n` +
        update.err_msg);
      return;
    }

    var column = '';
    var valueCheck = false;
    var errText = '';
    var value = args[1];

    if (args[0] == "職業") {
      column = sheetService.column_class;
      valueCheck = classValid(args[1], bot.config.valid.class);
      errText = '職業類別不對，請填寫正確的職業名稱';
    }
    else if (args[0] == "等級") {
      column = sheetService.column_level;
      valueCheck = levelValid(args[1], bot.config.valid.level);
      if (valueCheck == false) {
        value = args[1] = bot.config.valid.level[0].text;
        valueCheck = true;
      }
      // errText = '等級亂填寫會視為55以下，請確實填寫';
    }
    else if (args[0] == "攻擊") {
      column = sheetService.column_attack;
      valueCheck = attackDefenseValid(args[1], bot.config.valid.attack_max);
      errText = `請確實填寫覺醒攻擊力 0~${bot.config.valid.attack_max}`;
      if (valueCheck)
        value = parseInt(args[1], 10).toFixed(0);
    }
    else if (args[0] == "覺醒攻擊") {
      column = sheetService.column_awakening;
      valueCheck = attackDefenseValid(args[1], bot.config.valid.attack_max);
      errText = `請確實填寫覺醒攻擊力 0~${bot.config.valid.attack_max}`;
      if (valueCheck)
        value = parseInt(args[1], 10).toFixed(0);
    }
    else if (args[0] == "防禦") {
      column = sheetService.column_defense;
      valueCheck = attackDefenseValid(args[1], bot.config.valid.defense_max);
      errText = `請確實填寫防禦力 0~${bot.config.valid.defense_max}`;
      if (valueCheck)
        value = parseInt(args[1], 10).toFixed(0);
    }
    else {
      message.channel.send(`${message.author}\n${args[0]} 是錯誤的項目\n` +
        update.err_msg);
      return;
    }

    if (valueCheck == false) {
      message.channel.send(`${message.author}\n${errText}`);
      return;
    }

    var name = '';
    var id = message.author.id;
    var spliter = bot.config.spliter;

    try {
      var arr = message.guild.members.get(id).nickname.split(spliter);
      if (arr.length != 2) {
        message.channel.send(`找不到 ${arr} 的資訊\n` +
          `請確定你的discord暱稱是否符合公會規則\n` +
          `注意是暱稱不是使用者名稱`);
        return;
      } else {
        name = arr[1].replace(/ /g, "");
      }
    } catch (err) {
      message.channel.send(`找不到 ${name} 的資訊\n` +
        `請確定你的discord暱稱是否符合公會規則\n` +
        `注意是暱稱不是使用者名稱`);
      return;
    }

    for (let i = 0; i < file.table.member.length; i++) {
      if (file.table.member[i].id == id) {
        if (file.table.member[i].name != name) {
          message.channel.send(`請勿隨意更改成別人的暱稱\n` +
            `請確定你的discord暱稱是否符合公會規則`);
          return;
        }

        break;
      }
    }

    sheetService.updatePlayer(name, column, value, (player) => {
      if (player == null) {
        message.channel.send(`找不到 ${args[0]} 的資訊，請確定查看的家門名稱正確無誤\n或是你還沒有填寫表單`);
        return;
      }

      message.channel.send(`${name}已經更改${column}為${value}`);
    });
  }
}

module.exports = update;