const axios = require('axios');
const { Telegraf } = require('telegraf');
const dotenv = require('dotenv').config();

// Create New Instance of a bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// Default Reply from Bot'
// bot.use((ctx) => {
//   ctx.reply('Hello Human!');
// });

// Start Bot Command
bot.start((ctx) => {
  ctx.reply('welcome');
});

// Help Bot Command
bot.help((ctx) => {
  ctx.reply('How can i help you !\n - /help');
});

// This method is executed when a particular event occurs during the conversation with the bot for eg: Events like Sending text,
bot.on('sticker', (ctx) => {
  ctx.reply('Wow Cool Sticker');
});
bot.on('photo', (ctx) => {
  ctx.reply('Nice Pic ');
});
bot.on('document', (ctx) => {
  ctx.reply('Thank For sending it');
});

// This method executes when the given captured message matches with given keywords.
bot.hears('hi', (ctx) => {
  ctx.reply('Hello Sir How are You!');
});

// Command Method
bot.command('say', (ctx) => {
  //console.log(ctx)
  let msg = ctx.message.text;
  // convert into string array
  let newMsg = msg.split(' ');
  //removing first element
  newMsg.shift();
  let finalMsg = newMsg.join(' ');
  ctx.reply(finalMsg);
});
// Start Command
bot.command('start', (ctx) => {
  ctx.reply('Start Command \n - /start');
});

// Fetch data from internet using axios and display it
bot.command('fortune', async (ctx) => {
  const url = 'http://yerkee.com//api/fortune';
  const response = await axios.get(url);
  ctx.reply(response?.data?.fortune);
});
// Start the Bot
const startBot = () => {
  bot.launch();
  console.log('Bot is running');
};

startBot();
