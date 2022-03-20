const axios = require('axios');
const { Telegraf } = require('telegraf');
const dotenv = require('dotenv').config();

//Create Instance of a new bot
const bot = new Telegraf(process.env.COVID_BOT);

//Default Reply
// bot.use((ctx) => {
//   ctx.reply('Covid 19 Bot');
// });

bot.command('covid', async (ctx) => {
  //   console.log(ctx);
  let provinces = await getProvince();
  console.log(provinces);
  ctx.telegram.sendMessage(ctx.chat.id, '<b>Covid </b> Stats are incoming', {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        // provinces.map((province) => ({
        //   text: province,
        //   callback_data: province,
        // })),
        [{ text: provinces[0], callback_data: 'DL' }],
        [{ text: provinces[1], callback_data: 'DL' }],
        [{ text: provinces[2], callback_data: 'DL' }],
        [{ text: provinces[3], callback_data: 'DL' }],
      ],
    },
  });
});

//Action
bot.action('DL', (ctx) => {
  ctx.deleteMessage();
  getProvince();
  ctx.telegram.sendMessage(ctx.chat.id, 'Stats for Delhi', {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [[{ text: 'Go Back', callback_data: 'go-back' }]],
    },
  });
});

// Get Pakistan Province
const getProvince = async () => {
  let url =
    'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=Pakistan';
  let config = {
    headers: {
      'x-rapidapi-host': 'covid-19-coronavirus-statistics.p.rapidapi.com',
      'x-rapidapi-key': '4f7424d16fmshdd35e6de3695582p1d57fbjsna8fe8d73f9c8',
    },
  };
  let response = await axios.get(url, config);
  let results = response?.data?.data?.covid19Stats;
  //   console.log(response?.data?.data?.covid19Stats);
  let provinces = results.map((result) => result.province);

  return provinces;
};

//Run the bot
const runBot = () => {
  bot.launch();
  console.log('Covid Bot is running');
};
runBot();
