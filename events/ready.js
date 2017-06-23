const file = require('../util/file');

let ready = {
  func: (bot) => {
    bot.guilds.map(function (guild) {
      let dir = `./resources/member-${guild.id}.json`
      file.read(dir, (err, data) => {
        if (err) {
          var jsonObject = {
            "member": []
          };

          guild.members.map(function (guildMember) {
            if (guildMember.user.bot) return;
            if (guildMember.nickname == null) return;

            var spliter = bot.config.spliter;
            var nickname = guildMember.nickname.split(spliter);

            if (nickname[1] == null) return;

            var name = nickname[1].replace(" ", "");
            var element = { "name": name, "id": guildMember.id };
            jsonObject.member.push(element);
          });

          var dir = `./resources/member-${guild.id}.json`;

          file.write(dir, jsonObject, () => {
            // write json file completed
            console.log(`member-${guild.id} 名單更新完成`);
          });
        }

        console.log(`${bot.user.username} 在 ${guild.name}/${guild.id} 準備完成`);
      });
    });
  }
}

module.exports = ready;