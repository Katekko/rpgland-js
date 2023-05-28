import qrcode from 'qrcode-terminal';
import { Client, LocalAuth, Message } from 'whatsapp-web.js';
import { commands } from './commands';
import { Command, CommandMap } from './core/abstractions/command/command';
import { BotInMaintenanceException } from './core/exceptions/bot_in_maintenance.exception';
import { NotAllowedException } from './core/exceptions/not_allowed.exception';
import { ServiceFactory } from './core/factories/service.factory';
import { FirebaseService } from './core/firebase';
import { i18n } from './i18n/translation';

export const commandChar = '--';

// Initializing the firebase service
new FirebaseService();

ServiceFactory.makeMobsService().migrate();
ServiceFactory.makeItemsService().migrate();

const client = new Client({ authStrategy: new LocalAuth() });
const cooldowns: { [playerId: string]: number } = {};

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    try {
        const translate = i18n();
        const playerId = message.from;
        const currentTime = Date.now();
        const lastMessageTime = cooldowns[playerId] || 0;
        const timeDifference = currentTime - lastMessageTime;
        const cooldownDuration = 1000;

        const body = message.body;
        if (!body.startsWith(commandChar)) return null;

        await _validateWhitelist(message);

        if (timeDifference < cooldownDuration) {
            message.reply(translate.commands.commons.waitMessage);
            return;
        }

        const commandLine = body.split(commandChar)[1];
        const command = _findCommand(commandLine, message);
        if (command == null) return null;

        const args = _findArguments(commandLine);
        command.execute(message, args);
        console.log(`${(await message.getContact()).pushname} ${message.body}`);

        cooldowns[playerId] = currentTime;
    } catch (err) {
        console.log(err);
    }
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

async function _validateWhitelist(message: Message) {
    const translate = i18n();
    const commonsService = ServiceFactory.makeCommonsService();
    const whitelist = await commonsService.getWhitelist();
    const contact = await message.getContact();

    try {
        const foundNumber = whitelist.find(item => item.number === contact.number);
        if (!foundNumber) {
            throw new NotAllowedException();
        } else if (!foundNumber.allow) {
            throw new BotInMaintenanceException();
        }

    } catch (err) {
        if (err instanceof NotAllowedException) {
            console.log(`Not Authorized: ${contact.name} | ${contact.number}`);
            message.reply(translate.commands.commons.notAuthorized);
        } else if (err instanceof BotInMaintenanceException) {
            message.reply(translate.commands.commons.botMaintenance);
            console.log(`Bot in Maintenance: ${contact.name} | ${contact.number}`);
        } else {
            console.error(err);
            message.reply(translate.commands.commons.somethingWrong);
        }

        throw err;
    }
}