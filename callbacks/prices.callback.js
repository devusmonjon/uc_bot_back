const CONSTANTS = require("../constants");
const bot = require("../configs/bot");
const ucModel = require("../models/uc.model");
require("number-brm")

module.exports = async (ctx) => {
  const chat_id = ctx.from.id;
  const message_id = ctx.message.message_id;
  const lang = ctx.user.lang || "uz";
  const uces = await ucModel.find({})

  const prices = uces.map((uc, i) => {
    return `${i === 0 ? "\n\n" : ""}💰 ${uc.name} UC - <b>${uc.price.brm()}</b> SO'M${i !== uces.length ? "\n\n" : ""}`
  })

  await bot.editMessageText(`${CONSTANTS[lang].prices}${prices}`, {
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
