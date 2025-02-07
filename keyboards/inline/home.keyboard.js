const HOME_KEYBOARD = {
  uz: [
    [
      { text: "Narxlar 💸", callback_data: "prices" },
      { text: "Yordam 🆘", callback_data: "help" },
      { text: "Sharhlar 💬", callback_data: "reviews" },
    ],
    [
      {
        text: "UC Sotib olish",
        web_app: {
          url: "https://uc-bot-webapp.vercel.app",
        },
      },
    ],
    [
      {
        text: "популярность sotib olish",
        web_app: {
          url: "https://uc-bot-webapp.vercel.app/population",
        },
      },
    ],
  ],
  ru: [
    [
      { text: "Цены 💸", callback_data: "prices" },
      { text: "Помощь 🆘", callback_data: "help" },
      { text: "Отзывы 💬", callback_data: "reviews" },
    ],
    [
      {
        text: "Купить UC",
        web_app: {
          url: "https://uc-bot-webapp.vercel.app",
        },
      },
    ],
    [
      {
        text: "Купить популярность",
        web_app: {
          url: "https://uc-bot-webapp.vercel.app/population",
        },
      },
    ],
  ],
};

module.exports = HOME_KEYBOARD;
