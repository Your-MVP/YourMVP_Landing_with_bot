const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const token = 'YOUR_TELEGRAM_BOT_TOKEN'; // Keep secret, use env vars
const chatId = 'YOUR_CHAT_ID';
const bot = new TelegramBot(token);

app.use(bodyParser.json());

app.post('/api/send', async (req, res) => {
  const { name, email, idea } = req.body;
  const message = `New MVP Request:\nName: ${name}\nEmail: ${email}\nIdea: ${idea}`;
  try {
    await bot.sendMessage(chatId, message);
    res.status(200).send('Success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});