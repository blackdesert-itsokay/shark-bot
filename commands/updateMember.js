const file = require('../util/file');

let updateMember = {
  command: "更新名單",
  help: "更新家門名稱與ID的對照表",
  timer: () => {
    var sec = updateMember.interval;
    var timeId = setInterval(() => {
      if (sec <= 0) {
        updateMember.enable = true;
        clearInterval(timeId);
        return;
      } else sec -= 1;

      updateMember.restTime = sec;
    }, 1000);
  },
  restTime: 0,
  interval: 60,
  enable: true,
  func: (bot, message, args) => {
    var adminRoles = [];
    var isAdmin = false;

    for (var i = 0; i < bot.config.adminRoleName.length; i++) {
      var roleName = bot.config.adminRoleName[i].name;
      console.log(roleName);
      adminRoles[i] = message.guild.roles.find("name", roleName);
      if (message.member.roles.has(adminRoles[i].id)) {
        isAdmin = true;
      }
    }

    if (isAdmin) {
      if (!updateMember.enable) {
        message.channel.send(`請稍後${updateMember.restTime}秒在試`);
        return;
      }

      updateMember.enable = false;

      var jsonObject = {
        "member": []
      };

      message.guild.members.map(function (guildMember) {
        if (guildMember.user.bot) return;
        if (guildMember.nickname == null) return;

        let spliter = bot.config.spliter;
        let nickname = guildMember.nickname.split(spliter);

        if (nickname[1] == null) return;

        var name = nickname[1].replace(/ /g, "");
        var element = { "name": name, "id": guildMember.id };
        jsonObject.member.push(element);
      });

      var serverId = message.guild.id;
      var dir = `./resources/member-${serverId}.json`;

      file.write(dir, jsonObject, () => {
        // write json file completed
        message.channel.send("名單更新完成!");
        updateMember.timer();
      });
    } else {
      var str = '\n';
      for (var i = 0; i < adminRoles.length; i++)
        str += `${adminRoles.name} `;
      message.channel.send(updateMember.help + str + '可以使用');
    }
  }
}

module.exports = updateMember;