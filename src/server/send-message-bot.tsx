"use server"
import axios from 'axios';

export default async function sendMessageToTelegramBot(message: string) {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_IDS ? process.env.CHAT_IDS.split(',') : []

    try {
        if(CHAT_ID) {
            for (const chatId of CHAT_ID) {
                console.log(chatId);
                const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    chat_id: chatId,
                    text: message + `\n\n${process.env.LINK}`,
                });
          
                if (response.status === 200) {
                    console.log(`Message sent successfully to chat ID ${chatId}: ${message}`);
                } else {
                    console.error(`Failed to send message to chat ID ${chatId}:`, response.data);
                }
            }
        } else {
            console.error('CHAT_ID IS UNDEFINED');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
