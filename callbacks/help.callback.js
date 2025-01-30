const CONSTANTS = require("../constants")
const bot = require("../configs/bot");
const changeText = require("../helpers/changeText");

module.exports = async (ctx) => {
    const chat_id = ctx.from.id;
    const message_id = ctx.message.message_id;
    const lang = ctx.user.lang || "uz";

    await bot.editMessageText(changeText(CONSTANTS[lang].help_text), {
        message_id,
        chat_id,
        reply_markup: {
            inline_keyboard: [
                [
                    {text: CONSTANTS[lang].back_text, callback_data: "back_home"}
                ]
            ]
        }
    })
}