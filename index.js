import TelegramBot from 'node-telegram-bot-api';
import ping from 'net-ping';


const token = '5753137840:AAFKmXrrdeIYlwXbHlM8E92UwjMqR1YO_VI';

const bot = new TelegramBot(token, {polling: true});

const chats = ['627428340', '601883183']

const session = ping.createSession();

const sendInfoToBot = async (chatId, text) => {
  await bot.sendMessage(chatId, text);
}

const run = async () => {
  let isAlive;

  setInterval(async () => {
    let currentALive; 

    session.pingHost ('31.43.118.104', function (error, target) {
      if (error) {
        console.log (target + ": " + error.toString ());
        currentALive = false
      } else {
        console.log (target + ": Alive");
        currentALive = true;
      }

      if (isAlive !== currentALive) {
        if (currentALive === false) {
          chats.forEach((chat) => {
            sendInfoToBot(chat, 'Power is off')
          })
        }

        if (currentALive === true) {
          chats.forEach((chat) => {
            sendInfoToBot(chat, 'Power is on')
          })
        }

        isAlive = currentALive;
      }
  });
  }, 1000)
}

run();
