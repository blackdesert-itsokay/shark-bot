let guildMemberRemove = {
	func: (member, bot) => {
		let guild = member.guild;
		guild.defaultChannel.send(`很不幸的 ${member.user.username} 離開了~沒關係~\n`);
	}
}

module.exports = guildMemberRemove;