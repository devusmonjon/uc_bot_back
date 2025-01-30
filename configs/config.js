require("dotenv").config();

const COMMANDS = ["start", "find"];

const CONFIGS = {
    token: process.env.BOT_TOKEN,
    COMMANDS
};

module.exports = CONFIGS;