let guildMemberAdd = {
  func: (member, bot) => {
    let guild = member.guild;
		guild.defaultChannel.send(`歡迎 ${member.user.username} 來到~沒關係~\n` +
		`麻煩請先到#announcement閱讀我們的公告與規則`);
  }
}

module.exports = guildMemberAdd;