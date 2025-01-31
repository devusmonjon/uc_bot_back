const CONSTANTS = require("../constants");
const bot = require("../configs/bot");
const constantsModel = require("../models/constants.model");
const changePrice = require("../helpers/changePrice");

module.exports = async (ctx) => {
  const chat_id = ctx.from.id;
  const message_id = ctx.message.message_id;
  const lang = ctx.user.lang || "uz";
  const constants = await constantsModel.findOne({}).lean();
  console.log(constants.price)

  const prices = `

  💰 60 UC - <b>{{60}}</b> SO'M

  💰 120 UC - <b>{{120}}</b> SO'M

  💰 180 UC - <b>{{180}}</b> SO'M

  💰 325 UC - <b>{{325}}</b> SO'M

  💰 385 UC - <b>{{385}}</b> SO'M

  💰 660 UC - <b>{{660}}</b> SO'M

  💰 720 UC - <b>{{720}}</b> SO'M

  💰 985 UC - <b>{{985}}</b> SO'M

  💰 1320 UC - <b>{{1320}}</b> SO'M

  💰 1800 UC - <b>{{1800}}</b> SO'M

  💰 1920 UC - <b>{{1920}}</b> SO'M

  💰 3850 UC - <b>{{3850}}</b> SO'M

  💰 5650 UC - <b>{{5650}}</b> SO'M

  💰 8100 UC - <b>{{8100}}</b> SO'M

  💰 9900 UC - <b>{{9900}}</b> SO'M

  💰 12010 UC - <b>{{12010}}</b> SO'M

  💰 16200 UC - <b>{{16200}}</b> SO'M

  💰 24300 UC - <b>{{24300}}</b> SO'M

  💰 32400 UC - <b>{{32400}}</b> SO'M

  💰 40500 UC - <b>{{40500}}</b> SO'M`

  await bot.editMessageText(`${CONSTANTS[lang].prices}${changePrice(prices, constants.price, true)}`, {
    message_id,
    chat_id,
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [{ text: CONSTANTS[lang].back_text, callback_data: "back_home" }],
      ],
    },
  });
};
