const sheetService = require('../util/sheetService');

let search = {
  command: ["查看", "查詢"],
  help: "查詢該家門名稱的玩家資訊，如：職業、攻擊力、防禦力等",
  func: (bot, message, args) => {
    if (args[0] == null) {
      message.channel.send(`請輸入你要查詢的家門名稱`);
      return;
    }

    sheetService.getPlayer(args[0], function (player) {
      if (player == null) {
        message.channel.send(`找不到 ${args[0]} 的資訊，請確定輸入的家門名稱正確無誤\n或是你還沒有填寫表單`);
        return;
      }

      message.channel.send({
        embed: {
          color: 3447003,
          title: `${player[sheetService.column_name]}\n`,
          description: "★－:+:－:+:－:+:－:+:－:+:－:+:－:+:－:+:－:+:－:+:－:+:－★",
          fields: [{
            name: `等級`,
            value: `${player[sheetService.column_level]}`,
            inline: true
          },
          {
            name: `職業`,
            value: `${player[sheetService.column_class]}`,
            inline: true
          },
          {
            name: "★",
            value: "★",
            inline: true
          },
          {
            name: `攻擊`,
            value: `${player[sheetService.column_attack]}`,
            inline: true
          },
          {
            name: `覺醒攻擊`,
            value: `${player[sheetService.column_awakening]}`,
            inline: true
          },
          {
            name: `防禦`,
            value: `${player[sheetService.column_defense]}`,
            inline: true
          }
          ],
          timestamp: new Date(),
          footer: {
            text: `© by ${bot.user.username}`
          }
        }
      });
    });
  }
}

module.exports = search;