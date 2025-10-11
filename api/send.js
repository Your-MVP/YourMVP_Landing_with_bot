const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
require('dotenv').config(); // For local dev

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, email, idea } = req.body;
  const message = `New MVP Request:\nName: ${name}\nEmail: ${email}\nIdea: ${idea}`;

  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.CHAT_ID;
  const bot = new TelegramBot(token);

  try {
    await bot.sendMessage(chatId, message);
    res.status(200).send('Success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};