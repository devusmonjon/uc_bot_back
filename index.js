const app = require("./bot")
const bot = require("./configs/bot");
const connectToDatabase = require("./configs/db");

(async () => {
  try {
    const db = await connectToDatabase();
    if (db) {
      console.log("Database connected successfully");
      await app();
    }
  } catch (error) {
    console.log(error);
  }
})();