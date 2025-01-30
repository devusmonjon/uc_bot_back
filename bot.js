const backCallback = require("./callbacks/back.callback");
const helpCallback = require("./callbacks/help.callback");
const pricesCallback = require("./callbacks/prices.callback");
const reviewsCallback = require("./callbacks/reviews.callback");
require("dotenv").config();

const express = require("express");
const userModel = require("./models/user.model");
const app = express();
const cors = require("cors");
const bot = require("./configs/bot");
const CONSTANTS = require("./constants");
const random = require("./helpers/random");
require("number-brm");

const PORT = process.env.PORT || 5000;

const CARDS = [
  {
    number: 9860_1234_5678_0000,
    name: "Navbahor Xusanova",
  },
  {
    number: 9860_0000_5678_1234,
    name: "Aziza Narzullayeva",
  },
  {
    number: 9860_0000_1234_5678,
    name: "Adiz Rajabov",
  },
  {
    number: 9860_5678_0000_1234,
    name: "Nozima Abdullayeva",
  },
  {
    number: 9860_5678_1234_0000,
    name: "Mohira Abduvali qizi",
  },
];

app.use(cors());
app.use(express.json());
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await userModel.findOne({ telegramId: req.params.id });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Server error" });
  }
});
app.post("/api/web_app_data", async (req, res) => {
  try {
    const { telegramId, orderDetails, pubgId } = req.body;
    const user = await userModel.findOne({ telegramId: telegramId });

    const updated_user = await userModel.findOneAndUpdate(
      {
        telegramId: telegramId,
      },
      {
        step: 1,
      },
      { new: true }
    );
    if (updated_user) {
      let message =
        orderDetails.items
          .map((item) => {
            return `<b>UC ${item.product.uc.brm()} - ${item.product.price.brm()} SO'M</b>`;
          })
          .join("\n\n") +
        `\n\n<b>${
          CONSTANTS[user.lang].total
        }: </b>${orderDetails.total.brm()} SO'M\n\n<b>${
          CONSTANTS[user.lang].pubg_id
        }: </b>${pubgId}`;
      await bot.sendMessage(telegramId, message, {
        parse_mode: "HTML",
      });

      const random_card = random(CARDS);

      let message_payment = `<b>${
        CONSTANTS[user.lang].payment_details
      }</b>\n\n<b>Karta raqami: </b><pre>${
        random_card.number
      }</pre>\nKarta nomi: <pre>${random_card.name}</pre>\n\n<b>${
        CONSTANTS[user.lang].total
      }: </b>${orderDetails.total.brm()}\n\n<b>Iltimos shu kartaga belgilangan miqdorda pulni o'tkazib botga chekni yuboring.</b>`;
      await bot.sendMessage(telegramId, message_payment, {
        parse_mode: "HTML",
      });
    }

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = async function startBot() {
  const bot = require("./configs/bot");
  const { startCommand, findCommand } = require("./commands");
  const langChange = require("./helpers/langChange");
  const User = require("./models/user.model");
  const CONSTANS = require("./constants");
  const changeText = require("./helpers/changeText");

  bot.on("callback_query", async (ctx) => {
    try {
      const data = ctx.data;
      const chat_id = ctx.from.id;
      const first_name = ctx.from.first_name;
      const last_name = ctx.from.last_name;
      const full_name = `${first_name} ${last_name ?? ""}`;
      if (data === "uz" || data === "ru") return await langChange(ctx);

      {
        const user = await User.findOne({ telegramId: chat_id });
        if (!user) {
          return await bot.sendMessage(
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
        }
        ctx.user = user;
      }

      const lang = ctx.user.lang || "uz";

      if (data.includes("confirmpayment_")) {
        console.log(ctx.message)
      }
      if (data === "prices") return await pricesCallback(ctx);
      if (data === "help") return await helpCallback(ctx);
      if (data === "reviews") return await reviewsCallback(ctx);
      if (data.split("_")[0] === "back")
        return await backCallback(ctx, data.split("_")[1]);

      return await bot.answerCallbackQuery({
        callback_query_id: ctx.id,
        text: CONSTANS[lang].not_yet_launched,
      });
    } catch (error) {
      console.log(error);
      await bot.sendMessage(
        ctx.from.id,
        error.message ||
          "Nimadir xato ketdi iltimos qatadan urunib ko'ring /start / Что-то пошло не так, попробуйте еще раз. /start"
      );
    }
  });

  bot.setMyCommands([
    { command: "start", description: "Start the bot" },
    // { command: "find", description: "Find a job" },
    { command: "lang", description: "Tilni almashtirish / Смена языка" },
  ]);

  bot.on("message", async (ctx) => {
    try {
      const chat_id = ctx.from.id;
      const first_name = ctx.from.first_name;
      const last_name = ctx.from.last_name;
      const full_name = first_name + (last_name ? " " + last_name : "");
      const username = ctx.from.username;
      //   bot.sendMessage(
      //     ctx.chat.id,
      //     "Command not found. Please, type /start to start the bot."
      //   );
      const user = await User.findOne({ telegramId: chat_id });
      const photo = ctx.photo;
      const document = ctx.document;

      if (photo || document) {
        if (user.step === 1) {
          const updated_step = userModel.findOneAndUpdate(
            { telegramId: chat_id },
            { step: 0 },
            { new: true }
          );
          if (updated_step) {
            let message = `<b>‼️ Yanggi buyurtma ‼️</b>\n\n<b>Foydalanuvchi: </b>${full_name}\n<b>${
              CONSTANTS.uz.total
            }: </b>${(1000000000).brm()}`;
            const inline_keyboard = [
              [
                { text: "✅", callback_data: "confirmpayment_" + chat_id },
                { text: "❌", callback_data: "cancelpayment_" + chat_id },
              ],
            ];
            if (photo) {
              await bot.sendPhoto(
                CONSTANTS.group_id,
                photo[photo?.length - 1].file_id,
                {
                  caption: message,
                  parse_mode: "HTML",
                  reply_markup: {
                    inline_keyboard
                  }
                }
              );
            } else if (document) {
              await bot.sendDocument(CONSTANTS.group_id, document.file_id, {
                caption: message,
                parse_mode: "HTML",
                reply_markup: {
                  inline_keyboard
                }
              });
            }
          } else {
            throw new Error(null);
          }
        } else {
          await bot.sendMessage(chat_id, "/start");
        }
      }
      if (!user) {
        return await bot.sendMessage(
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
      }
      ctx.user = user;

      if (ctx.text === "/start") return await startCommand(ctx);

      if (ctx.text === "/lang") {
        return await bot.sendMessage(
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
      }
    } catch (error) {
      await bot.sendMessage(
        ctx.chat.id,
        error.message ||
          "Nimadir xato ketdi iltimos qatadan urunib ko'ring /start / Что-то пошло не так, попробуйте еще раз. /start"
      );
    }
  });

  console.log("Bot has been started...");
};
