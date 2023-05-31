import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { ServiceFactory } from './core/factories/service.factory';
import { FirebaseService } from './core/firebase';
import { CustomMessage, HandleMessages } from './handle_messages';

export const commandChar = '--';

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

console.log(`[RPG LAND] Loading api wrapper whatsapp!`);
client.initialize();

client.on('qr', qr => { qrcode.generate(qr, { small: true }); });
client.on('authenticated', () => { console.log('[RPG LAND] Client successfully authenticated.'); });
client.on('ready', () => {
    new FirebaseService();
    console.log('[RPG LAND] Client ready to receive messages!');
});

client.on('message', async message => {
    try {
        const contact = await message.getContact();
        const customMessage = new CustomMessage(
            {
                timestamp: message.timestamp,
                phone: contact.number,
                body: message.body,
                reply: (text: string) => message.reply(text),
                name: (await message.getContact()).pushname,
                isGroup: (await message.getChat()).isGroup,
            }
        );

        const handler = new HandleMessages(
            {
                message: customMessage,
                commandChar: commandChar,
                playersService: ServiceFactory.makePlayersService(),
                commonsService: ServiceFactory.makeCommonsService(),
                itemsService: ServiceFactory.makeItemsService(),
                mobsService: ServiceFactory.makeMobsService(),
            }
        );

        await handler.handle();
    } catch (err) {
        console.log(`[RPG LAND] ${err}`);
    }
});
