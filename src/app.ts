import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';

const client = new Client({ authStrategy: new LocalAuth() });

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    console.log(message.body);
    if (message.body === '!ping') {
        message.reply('pong');
    }else if(message.body === '!pika'){
        message.reply('pikissimo');
    }
});

client.initialize();