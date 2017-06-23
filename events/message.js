let message = {
  func: (message, bot) => {
    var prefix = bot.config.prefix;

    if (!message.content.startsWith(prefix) || message.author.bot)
      return;

    const args = message.content.split(' ');
    const command = args.shift().slice(prefix.length);

    try {
      let cmd = bot.commands[command];
      cmd.func(bot, message, args);
    } catch (err) {
      // console.log(`command ${command} failed.\n${err.stack}`);
    }
  }
}

module.exports = message;