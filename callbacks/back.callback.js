const CONSTANTS = require("../constants")
const bot = require("../configs/bot");
const { startCommand } = require("../commands");

module.exports = async (ctx, back_to) => {
    const chat_id = ctx.from.id;
    const message_id = ctx.message.message_id;
    const lang = ctx.user.lang || "uz";

    if (back_to === "home") {
        await bot.deleteMessage(chat_id, message_id)
        return await startCommand(ctx); 
    }
}