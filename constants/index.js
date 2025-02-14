const SETTINGS = require("./settings");

const CONSTANS = {
  ...SETTINGS,
  uz: {
    label: {
      name: "O'zbekcha",
      code: "uz",
      direction: "ltr",
    },
    commands: {
      start: `{{title}} ga xush kelibsiz

{{title}} avtomatik bot bo'lib, u UCni bir zumda hisobingizga 24/7 yetkazib beradi.

🔐 Barcha xaridlaringiz toʻliq himoyalangan, shuningdek, har qanday toʻldirish uchun chek soʻrashingiz mumkin.`,
      find: "Marhamat bizning ishlar",
    },
    lang: {
      change: "Tilni o'zgartirish",
      change_successfully: "Til muvaffaqqiyatli tanlandi 🇺🇿",
    },
    pubg_id: "Sizning PUBG ID",
    total: "umumiy qiymat",
    payment_details: `To'lov tavfsilotlari`,
    not_yet_launched: "Ushbu bo'lim hali ishga tushmagan",
    back_text: "Ortga 🔙",
    help_text: `1) Kreditlash 3 daqiqagacha vaqt olishi mumkin, agar siz 720UC sotib olgan bo'lsangiz, avval siz 660UC, keyin 60 UC olasiz, shuningdek, boshqa paketlar bilan, masalan: 180UC = 60 UC + 60 UC + 60 UC

2) Biz to'lov tizimidan foydalanish uchun komissiya to'laymiz, shuning uchun narxlar biroz yuqoriroq bo'lishi mumkin

3) Bot orqali 100 000 dan ortiq buyurtma berildi va 100% odamlar UCni oldilar, agar sizga biror narsa bo'lsa, {{support_username}} deb yozing.`,
    reviews: `Sharhlar 🧾

🖌 Sharhlar bor kanal - {{reviews_channel_url}}

📊 Bizning do'konimiz - {{market_channel_url}}

🛠 Texnik yordam — {{support_username}}`,
    prices: `✅ Paketlar narxi to'ldirish usuliga bog'liq:`,
  },
  ru: {
    label: {
      name: "Русский",
      code: "ru",
      direction: "ltr",
    },
    commands: {
      start: `Добро пожаловать в {{title}}

{{title}} - это автоматический бот, который доставит вам UC на ваш счет 24/7.

🔐 Все ваши покупки полностью защищены, а также вы можете запросить чек на любую покупку.`,
      find: "Пожалуйста, наши работы",
    },
    lang: {
      change: "Изменить язык",
      change_successfully: "Язык выбран успешно 🇷🇺",
    },
    pubg_id: "Ваш PUBG ID",
    total: "общая цена",
    payment_details: `Реквизиты для оплаты`,
    not_yet_launched: "Этот раздел пока не работает",
    back_text: "Назад 🔙",
    help_text: `1) Зачисление может идти до 3 минут, если вы приобрели 720UC, то сначала вам придет 660UC, а потом 60 UC, также с другими паками, например: 180UC = 60 UC + 60 UC + 60 UC

2) Мы платим комиссию за использование платежной системы, поэтому цены могут быть чуть выше

3) Более 100.000 заказов были сделаны через бота и 100% людей получили свои UC, если у вас что-то произошло, просто напишите {{support_username}}`,
    reviews: `Отзывы 🧾

🖌 Канал с отзывами - {{reviews_channel_url}}

📊 Наш Магазин - {{market_channel_url}}

🛠 Тех.поддержка — {{support_username}}`,
    prices: `✅ Цены на паки зависят от метода пополнения:`,
  },
};

module.exports = CONSTANS;
