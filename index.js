// require discord node js api and new a bot client
const Discord = require("discord.js");
const bot = new Discord.Client();
// load bot config json file
bot.config = require("./resources/config.json");

const commandLoader = require('./util/commandLoader');
const eventLoader = require('./util/eventLoader');
const sheetService = require('./util/sheetService');
const file = require('./util/file');

var init = () => {
  commandLoader(bot);
  eventLoader(bot);

  // login with bot token
  bot.login(bot.config.token);
};

init();