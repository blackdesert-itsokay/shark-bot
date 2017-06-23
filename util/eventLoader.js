const requestEvent = (event) => require(`../events/${event}`);

let eventLoader = (bot) => {
  bot.on('ready', () => requestEvent('ready').func(bot));
  bot.on('guildMemberAdd', (member) => requestEvent('guildMemberAdd').func(member, bot));
  bot.on('guildMemberRemove', (member) => requestEvent('guildMemberRemove').func(member, bot));
  bot.on('message', (message) => requestEvent('message').func(message, bot));
};

module.exports = eventLoader;