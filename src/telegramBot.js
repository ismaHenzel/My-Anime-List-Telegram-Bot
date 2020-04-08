import TelegramBot from 'node-telegram-bot-api';
import {cache} from './cache/cache.js'
import filter from './services/filterContent.js'

const token = "1196435211:AAHJNfUtkH699PuOEf_N0sOJR6Wm9-QCKlA"
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/anime_rank (.+)/, async function (msg , match){
    const id = msg.chat.id;
    
    let args = match[1].split(/[ ,]+/);
    let position = Number.isInteger(parseInt(args[1]))? parseInt(args[1]) : 10;
    
    let content = await filter(args[0]);
    if(!content){
        return bot.sendMessage(id, "Incorrect Word, read the documentation for more informations")
    };

    let result = await cache(content)
    return bot.sendMessage(id,result.slice(0, position+1).join("\n"));
})
