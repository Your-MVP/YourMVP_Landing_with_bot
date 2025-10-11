const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');
require('dotenv').config(); // For local dev

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const {
    lang,
    name,
    email,
    phone,
    telegram,
    other_contact,
    preferred_contact,
    idea,
  } = req.body;
  const message =
    `🚀 Новая заявка на MVP!` +
    `\n\n🌐 Язык: ${lang}` +
    `\n\n👤 Имя: ${name}` +
    `\n\n📞 Контакты:` +
    `\n📧: ${email || "не указан"}` +
    `\n📱: ${phone || "не указан"}` +
    `\nTelegram: ${telegram || "не указан"}` +
    `\n📡: ${other_contact || "не указан"}` +
    `\n\n⭐ Предпочтительный способ связи: ${preferred_contact}` +
    `\n\n💡 Идея:\n${idea}`;

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