
const backCallback = require("./callbacks/back.callback");
const helpCallback = require("./callbacks/help.callback");
const pricesCallback = require("./callbacks/prices.callback");
const reviewsCallback = require("./callbacks/reviews.callback");
require("dotenv").config();

const express = require("express");
const userModel = require("./models/user.model");
const cardsModel = require("./models/cards.model");
const app = express();
const cors = require("cors");
const bot = require("./configs/bot");
const CONSTANTS = require("./constants");
const random = require("./helpers/random");
const ordersModel = require("./models/orders.model");
const constantsModel = require("./models/constants.model");
const collectionModel = require("./models/collection.model");
const ucModel = require("./models/uc.model");
const blockCallback = require("./callbacks/block.callback");
require("number-brm");

const PORT = process.env.PORT || 7777;

app.use(cors());
app.use(express.json());
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await userModel.findOne({ telegramId: req.params.id });
    if (user.status === false) {
      await bot.sendMessage(
        user.telegramId,
        user.lang == "uz" ? "Siz bloklangansiz" : "Вы заблокированы"
      );
      return res.status(500).json({ error: "blocked" })
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Server error" });
  }
});
app.get("/api/population", async (_, res) => {
  try {
    const collections = await collectionModel.find({});
    res
      .status(200)
      .json({ message: "Populations", data: { populations: collections } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Server error" });
  }
});
app.get("/api/uc", async (_, res) => {
  try {
    const uces = await ucModel.find({});
    res
      .status(200)
      .json({ message: "Uces", data: { uc: uces } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Server error" });
  }
});
app.get("/api/price", async (_, res) => {
  try {
    const constants = await constantsModel.findOne({});
    res.status(200).json({ price: constants.price });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, message: "Server error" });
  }
});
app.post("/api/web_app_data", async (req, res) => {
  try {
    const { telegramId, orderDetails, pubgId, full_name } = req.body;
    const user = await userModel.findOne({ telegramId: telegramId });

    if (!user) throw new Error("User not found");

    if (user.status === false) {
      await bot.sendMessage(
        user.telegramId,
        user.lang == "uz" ? "Siz bloklangansiz" : "Вы заблокированы"
      );
      return res.status(500).json({ error: "blocked" })
    }

    let order_message = `<b>‼️ Yanggi buyurtma ‼️</b>\n\n${orderDetails.items
      .map((item) => {
        return `<b>${item.product.uc.brm()} UC - ${item.product.price.brm()} SO'M</b>`;
      })
      .join("\n\n")}\n\n<b>Foydalanuvchi: </b>${full_name}\n<b>${
      CONSTANTS.uz.total
    }: </b>${orderDetails.total.brm()} SO'M\n\n<b>PUBG ID: ${pubgId}</b>`;
    const create_order = await ordersModel.create({
      user_id: user._id,
      message: order_message,
    });
    if (!create_order) throw new Error("Buyurtma yaratishda xatolik");
    const updated_user = await userModel.findOneAndUpdate(
      {
        telegramId: telegramId,
      },
      {
        step: 1,
        currentOrderId: create_order._id,
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

      const CARDS = await cardsModel.find({});

      const random_card = random(CARDS);

      let message_payment = `<b>${
        CONSTANTS[user.lang].payment_details
      }</b>\n\n<b>${user.lang === "uz" ? "Karta raqami:" : "Номер карты"}  </b><pre>${
        random_card.number
      }</pre>\n${user.lang === "uz" ? "Karta nomi:" : "Имя карты"} <pre>${random_card.name}</pre>\n\n<b>${
        CONSTANTS[user.lang].total
      }: </b>${orderDetails.total.brm()} SO'M\n\n<b>${user.lang === "uz" ? "Iltimos ko'rsatilgan kartaga belgilangan miqdorda pulni o'tkazib botga chekni yuboring." : "Пожалуйста, переведите указанную сумму на указанную карту и отправьте чек боту."}</b>`;
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
app.post("/api/web_app_data/population", async (req, res) => {
  try {
    const { telegramId, orderDetails, pubgId, full_name } = req.body;
    const user = await userModel.findOne({ telegramId: telegramId });

    if (!user) throw new Error("User not found");

    if (user.status === false) {
      await bot.sendMessage(
        user.telegramId,
        user.lang == "uz" ? "Siz bloklangansiz" : "Вы заблокированы"
      );
      return res.status(500).json({ error: "blocked" })
    }

    let order_message = `<b>‼️ Yanggi buyurtma ‼️</b>\n\n${orderDetails.items
      .map((item) => {
        return `<b>PP ${item.product.uc.brm()} - ${item.product.price.brm()} SO'M</b>`;
      })
      .join("\n\n")}\n\n<b>Foydalanuvchi: </b>${full_name}\n<b>${
      CONSTANTS.uz.total
    }: </b>${orderDetails.total.brm()} SO'M\n\n<b>PUBG ID: ${pubgId}</b>`
    const create_order = await ordersModel.create({
      user_id: user._id,
      message: order_message,
    });
    if (!create_order) throw new Error("Buyurtma yaratishda xatolik");
    const updated_user = await userModel.findOneAndUpdate(
      {
        telegramId: telegramId,
      },
      {
        step: 1,
        currentOrderId: create_order._id,
      },
      { new: true }
    );
    if (updated_user) {
      let message =
        orderDetails.items
          .map((item) => {
            return `<b>${item.product.uc.brm()} PP - ${item.product.price.brm()} SO'M</b>`;
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

      const CARDS = await cardsModel.find({});

      const random_card = random(CARDS);

      let message_payment = `<b>${
        CONSTANTS[user.lang].payment_details
      }</b>\n\n<b>Karta raqami: </b><pre>${
        random_card.number
      }</pre>\nKarta nomi: <pre>${random_card.name}</pre>\n\n<b>${
        CONSTANTS[user.lang].total
      }: </b>${orderDetails.total.brm()} SO'M\n\n<b>Iltimos shu kartaga belgilangan miqdorda pulni o'tkazib botga chekni yuboring.</b>`;
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
  const { startCommand } = require("./commands");
  const langChange = require("./helpers/langChange");
  const User = require("./models/user.model");
  const CONSTANS = require("./constants");
  const changeText = require("./helpers/changeText");

  bot.on("callback_query", async (ctx) => {
    try {
      const data = ctx.data;
      const message_id = ctx.message.message_id;
      const caption = ctx.message.caption;
      const chat_id = ctx.from.id;
      const first_name = ctx.from.first_name;
      const last_name = ctx.from.last_name;
      const full_name = `${first_name} ${last_name ?? ""}`;
      const user = await User.findOne({ telegramId: chat_id });
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
        if (user.status === false) {
          return await bot.sendMessage(
            user.telegramId,
            user.lang == "uz" ? "Siz bloklangansiz" : "Вы заблокированы"
          );
        }
        ctx.user = user;
      }

      const lang = ctx.user.lang || "uz";

      if (data.split("_")[0] === "block") {
        return await blockCallback(ctx, data.split("_")[1]);
      }
console.log(data)
      if (data.includes("confirmpayment_")) {
        const chat_id = data.split("_")[1];
        const is_uc = data.split("_")[2] === "uc" ? true : false;
        let msg = "";
        if (is_uc) {
          msg = user.lang === "uz" ? `<b>UC allaqachon o'yin identifikatoringizga kiritilgan ✅

Ishonchingiz uchun rahmat @aslamucservis 👮‍♀️</b>` : `<b>Юсишки уже зачислены на ваш игровой ID ✅

Благодарим вас за доверие @aslamucservis 👮‍♀️</b>`;
        } else {
          msg = user.lang === "uz" ? `<b>Mashhurlik allaqachon o'yin identifikatoringizga hisoblangan 🔥

Ishonchingiz uchun rahmat @aslamucservis 👮‍♀️<b/>` : `<b>Популярность уже зачислены на ваш игровой ID 🔥

Благодарим вас за доверие @aslamucservis 👮‍♀️</b>`
        }
        await bot.sendMessage(chat_id, msg || "buyurtma tasdiqlandi ✅", {
          parse_mode: "HTML",
        });
        return await bot.editMessageCaption(
          `${caption}\n\n<b>Tasdiqlandi ✅</b>`,
          {
            message_id,
            chat_id: ctx.message.chat.id,
            parse_mode: "HTML",
          }
        );
      }
      if (data.includes("cancelpayment_")) {
        const chat_id = data.split("_")[1];
        await bot.sendMessage(chat_id, user.lang === "uz" ? "buyurtma bekor qilindi ❌" : "заказ отменен ❌", {parse_mode: "HTML"});
        return await bot.editMessageCaption(
          `${caption}\n\n<b>Bekor qilindi ❌</b>`,
          {
            message_id,
            chat_id: ctx.message.chat.id,
            parse_mode: "HTML",
          }
        );
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
    {
      command: "start",
      description: "Botni qayta ishga tushirish / Перезапустить бот",
    },
    // { command: "find", description: "Find a job" },
    { command: "lang", description: "Tilni almashtirish / Смена языка" },
  ]);
  bot.on("photo", async (ctx) => {
    const chat_id = ctx.from.id;
    const user = await User.findOne({ telegramId: chat_id });

    if (!user) return;

    const photo = ctx.photo;

    console.log(user.step);

    if (user.step === 1) {
      // Immediately update step to prevent duplicate processing
      const updatedUser = await userModel.findOneAndUpdate(
        { telegramId: chat_id, step: 1 }, // Condition: Only update if step is still 1
        { step: 0 }, // Change step to 0
        { new: true }
      );

      if (!updatedUser) return; // If already updated, do nothing

      console.log(updatedUser.step); // Confirm step has changed

      let message = "";
      const order = await ordersModel.findOne({ _id: user.currentOrderId });
      if (order) message = order.message;

      const is_uc = message.toLowerCase().includes("pp") ? false : true

      const inline_keyboard = [
        [
          { text: "✅", callback_data: `confirmpayment_${chat_id}${is_uc ? "_uc" : "_pp"}` },
          { text: "❌", callback_data: `cancelpayment_${chat_id}${is_uc ? "_uc" : "_pp"}` },
        ],
        [{ text: "🚫 Заблокировать", callback_data: "block_" + chat_id }],
      ];
      let message_2 = ""
      let is_pp = message.toLowerCase().includes("pp") ? true : false
      if (is_pp) {
        message_2 = user.lang === "uz" ? "<b>Tabriklaymiz! 🎉\nmuvaffaqiyatli yakunlandi!\nModeratorlar tekshirgandan so'ng\nHisobinggiz mashhurlikk erishadi. Endi sizda bor\nyanada mashhur bo'lish imkoniyati\ndo'stlar orasida va ko'tarilish\nreyting! 🔥\n\nIshonchingiz uchun rahmat @aslamucservis 👮‍♀️</b>" : "<b>Поздравляем! 🎉\nуспешно оформлен! После\nпроверки модераторами\nпопулярность будет зачислена на\nваш аккаунт. Теперь у вас есть\nшанс стать ещё популярнее\nсреди друзей и подняться в\nрейтинге! 🔥\n\nБлагодарим вас за доверие @aslamucservis 👮‍♀️</b>"
      } else {
        message_2 = user.lang === "uz" ? "<b>Tabriklaymiz, buyurtmangiz qabul qilindi, ro'yxatdan o'tish holati haqida tez orada xabar beramiz 🚀\n\nIshonchingiz uchun rahmat @aslamucservis 👮‍♀️</b>" : "<b>Поздравляю ваш Заказ принят в скором времени сообщим вам о Статусе зачисления 🚀\n\nБлагодарим вас за доверие @aslamucservis 👮‍♀️</b>"
      }

      await bot.sendMessage(
        chat_id,
        message_2,
        { parse_mode: "HTML" }
      );

      if (photo) {
        return await bot.sendPhoto(
          CONSTANTS.group_id,
          photo[photo.length - 1].file_id,
          {
            caption: message,
            parse_mode: "HTML",
            reply_markup: { inline_keyboard },
          }
        );
      }
    }
  });
  bot.on("document", async (ctx) => {
    const chat_id = ctx.from.id;
    const user = await User.findOne({ telegramId: chat_id });

    if (!user) return;

    const document = ctx.document;

    console.log(user.step);

    if (user.step === 1) {
      // Immediately update step to prevent duplicate processing
      const updatedUser = await userModel.findOneAndUpdate(
        { telegramId: chat_id, step: 1 }, // Condition: Only update if step is still 1
        { step: 0 }, // Change step to 0
        { new: true }
      );

      if (!updatedUser) return; // If already updated, do nothing

      console.log(updatedUser.step); // Confirm step has changed

      const order = await ordersModel.findOne({ _id: user.currentOrderId });
      if (order) message = order.message;

      const is_uc = message.toLowerCase().includes("pp") ? false : true

      let message_2 = ""
      let is_pp = message.toLowerCase().includes("pp") ? true : false
      if (is_pp) {
        message_2 = user.lang === "uz" ? "<b>Tabriklaymiz! 🎉\nmuvaffaqiyatli yakunlandi!\nModeratorlar tekshirgandan so'ng\nHisobinggiz mashhurlikk erishadi. Endi sizda bor\nyanada mashhur bo'lish imkoniyati\ndo'stlar orasida va ko'tarilish\nreyting! 🔥\n\nIshonchingiz uchun rahmat @aslamucservis 👮‍♀️</b>" : "<b>Поздравляем! 🎉\nуспешно оформлен! После\nпроверки модераторами\nпопулярность будет зачислена на\nваш аккаунт. Теперь у вас есть\nшанс стать ещё популярнее\nсреди друзей и подняться в\nрейтинге! 🔥\n\nБлагодарим вас за доверие @aslamucservis 👮‍♀️</b>"
      } else {
        message_2 = user.lang === "uz" ? "<b>Tabriklaymiz, buyurtmangiz qabul qilindi, ro'yxatdan o'tish holati haqida tez orada xabar beramiz 🚀\n\nIshonchingiz uchun rahmat @aslamucservis 👮‍♀️</b>" : "<b>Поздравляю ваш Заказ принят в скором времени сообщим вам о Статусе зачисления 🚀\n\nБлагодарим вас за доверие @aslamucservis 👮‍♀️</b>"
      }

      await bot.sendMessage(
        chat_id,
        message_2,
        { parse_mode: "HTML" }
      );

      const inline_keyboard = [
        [
          { text: "✅", callback_data: `confirmpayment_${chat_id}${is_uc ? "_uc" : "_pp"}` },
          { text: "❌", callback_data: `cancelpayment_${chat_id}${is_uc ? "_uc" : "_pp"}` },
        ],
        [{ text: "🚫 Заблокировать", callback_data: "block_" + chat_id }],
      ];

      if (document) {
        return await bot.sendDocument(CONSTANTS.group_id, document.file_id, {
          caption: message,
          parse_mode: "HTML",
          reply_markup: { inline_keyboard },
        });
      }
    }
  });

  bot.on("message", async (ctx) => {
    try {
      const chat_id = ctx.from.id;
      const first_name = ctx.from.first_name;
      const last_name = ctx.from.last_name;
      const full_name = first_name + (last_name ? " " + last_name : "");
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

      if (user.status === false) {
        return await bot.sendMessage(
          user.telegramId,
          user.lang == "uz" ? "Siz bloklangansiz" : "Вы заблокированы"
        );
      }

      ctx.user = user;

      if (ctx.text === "/start") {
        const updateStep = await userModel.findOneAndUpdate(
          { telegramId: chat_id },
          { step: 0 },
          { new: true }
        );
        return await startCommand(ctx);
      }

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
