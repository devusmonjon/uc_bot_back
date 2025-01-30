const bot = require("../configs/bot");
const CONSTANS = require("../constants");
const changeText = require("../helpers/changeText");
const HOME_KEYBOARD = require("../keyboards/inline/home.keyboard");

module.exports = class Commands {
  static async startCommand(ctx) {
    const chatId = ctx.from.id;
    const lang = ctx?.user?.lang || "uz"
    await bot.sendMessage(chatId, changeText(CONSTANS[lang].commands.start), {
      reply_markup: {
        inline_keyboard: HOME_KEYBOARD[lang]
      }
    })
  }

  // Command not found
  static async NotFoundCommand(ctx) {
    const chatId = ctx.chat.id;
    return await bot.sendMessage(
      chatId,
      "Command not found. Please, type /start to start the bot."
    );
  }
};
