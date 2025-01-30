const User = require("../models/user.model");
const CONSTANS = require("../constants");
const bot = require("../configs/bot")

module.exports = async (ctx) => {
    const chat_id = ctx.from.id;
    const lang = ctx.data;
    try {
      if (lang === "uz" || lang === "ru") {
        const user = await User.findOne({ telegramId: chat_id });
        if (!user) {
          const newUser = await User.create({
            telegramId: chat_id,
            lang,
            role: "user",
          });
          if (!newUser)
            throw new Error("Ro'yxatdan o'tishda xatolik /start / Ошибка регистрации /start");
        } else {
          await User.findOneAndUpdate(
            { telegramId: chat_id },
            {
              lang,
            }
          );
        }
      }
      return bot.editMessageText(
        CONSTANS[lang].lang.change_successfully,
        {
          chat_id,
          message_id: ctx.message.message_id,
        }
      );
    } catch (err) {
      bot.sendMessage(
        chat_id,
        err.message ||
          "Nimadir xato ketdi iltimos qatadan urunib ko'ring /start / Что-то пошло не так, попробуйте еще раз. /start"
      );
    }
  }