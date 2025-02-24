const SETTINGS = require("../../constants/settings");

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
          url: SETTINGS.webapp_url,
        },
      },
    ],
    [
      {
        text: "популярность sotib olish",
        web_app: {
          url: `${SETTINGS.webapp_url}/population`,
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
          url: SETTINGS.webapp_url,
        },
      },
    ],
    [
      {
        text: "Купить популярность",
        web_app: {
          url: `${SETTINGS.webapp_url}/population`,
        },
      },
    ],
  ],
};

module.exports = HOME_KEYBOARD;
