import qrcode from 'qrcode-terminal';
import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import { commands } from './commands';
import { Command, CommandMap } from './core/command';
import { FirebaseService } from './services/firebase';
import { MobService } from './services/mobs.service';
import { ItemsService } from './services/items.service';
import { i18n } from './i18n/translation';

export const commandChar = '--';

// Initializing the firebase service
new FirebaseService();
new MobService().migrateMobs();
new ItemsService().migrateItems();

const client = new Client({ authStrategy: new LocalAuth() });
const cooldowns: { [playerId: string]: number } = {};

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    const playerId = message.from;
    const currentTime = Date.now();
    const lastMessageTime = cooldowns[playerId] || 0;
    const timeDifference = currentTime - lastMessageTime;
    const translate = i18n();

    // Set the cooldown duration in milliseconds (e.g., 1 second = 1000 milliseconds)
    const cooldownDuration = 1000;

    if (timeDifference < cooldownDuration) {
        // Reply with a message indicating that the player needs to wait
        message.reply(translate.commands.commons.waitMessage);
        return;
    }

    const body = message.body;
    if (!body.startsWith(commandChar)) return null;
    const commandLine = body.split(commandChar)[1];

    const command = _findCommand(commandLine, message);
    if (command == null) return null;

    const args = _findArguments(commandLine);
    command.execute(message, args);
    console.log(`${(await message.getContact()).pushname} ${message.body}`);

    // Update the player's cooldown timestamp
    cooldowns[playerId] = currentTime;
});

client.initialize();

function _findArguments(commandLine: string): string[] {
    const commandParts = commandLine.split(' ');
    const args: string[] = [];

    let currentCommand: CommandMap | Command = commands;

    for (let i = 0; i < commandParts.length; i++) {
        const commandPart = commandParts[i];

        if (typeof currentCommand === 'object' && commandPart in currentCommand) {
            currentCommand = (currentCommand as CommandMap)[commandPart] as Command | CommandMap;
        } else {
            args.push(commandPart);
        }
    }

    return args;
}

function _findCommand(commandLine: String, message: Message, currentCommands: CommandMap = commands): Command | null {
    try {
        const commandParts = commandLine.split(' ');
        for (const command of commandParts) {
            if (currentCommands instanceof Command) {
                return currentCommands;
            }

            if (!(command in currentCommands)) {
                throw Error();
            }

            currentCommands = currentCommands[command] as CommandMap;
        }

        if (currentCommands instanceof Command) {
            return currentCommands;
        }

        throw Error();
    } catch (error) {
        message.reply('❌ Command not found');
        return null;
    }
}