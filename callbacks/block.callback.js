const bot = require("../configs/bot");
const userModel = require("../models/user.model");

module.exports = async (ctx, chat) => {
  const chat_id = ctx.message.chat.id;
  const message_id = ctx.message.message_id;
  const caption = ctx.message.caption;
  const blockUser = await userModel.findOneAndUpdate({ telegramId: chat }, { status: false });

  if (!blockUser) {
    return await bot.sendMessage(chat_id, "Foydalanuvchi topilmadi yoki nimadir xato ketdi iltimos qayta urunib ko'ring / Пользователь не найден или что-то пошло не так пожалуйста, повторите попытку");
    ;
  }

  await bot.editMessageCaption(`${caption}\n\n<b>Foydalanuvchi bloklandi / Пользователь заблокирован</b>`, {
    message_id,
    chat_id,
    parse_mode: "HTML",
  });
  await bot.sendMessage(chat, `<b>Siz bloklandingiz / Вы заблокированы</b>`, {
    parse_mode: "HTML",
  });
};
