const changeText = require("../helpers/changeText");

module.exports = async (ctx) => {
  const chat_id = ctx.from.id;
  const first_name = ctx.from.first_name;
  const last_name = ctx.from.last_name;
  const full_name = first_name + (last_name ? " " + last_name : "");
  await bot.sendMessage(
    chat_id,
    changeText(
      `${full_name} {{title}}'ga xush kelibsiz iltimos tilni tanlang \n${full_name} Добро пожаловать в {{title}}, пожалуйста, выберите язык`
    ),
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🇺🇿 O'zbekcha", callback_data: "uz" },
            { text: "🇷🇺 Русский", callback_data: "ru" },
          ],
        ],
      },
    }
  );
};
