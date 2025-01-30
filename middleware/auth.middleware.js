const User = require("../models/user.model");
const connectToDatabase = require("../configs/db");

class Middleware {
  static async register(telegramId, lang) {
    try {
      await connectToDatabase();
      const user = await User.findOne({ telegramId });
      if (!user) {
        const newUser = new User({
          telegramId,
          lang,
        });
        await newUser.save();
        return newUser;
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  static async getUser(telegramId) {
    try {
      const user = await User.findOne({ telegramId });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Middleware;
