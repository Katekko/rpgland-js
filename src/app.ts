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

const client = new Client({ authStrategy: new LocalAuth() });
const cooldowns: { [playerId: string]: number } = {};
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
        const number = (await message.getContact()).number;
        const translate = i18n(number);
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
        const command = await _findCommand(commandLine, message);
        if (command == null) return null;

        const args = _findArguments(commandLine);
        command.execute(message, args);
        console.log(`${(await message.getContact()).pushname} ${message.body}`);

        cooldowns[playerId] = currentTime;
    } catch (err) {
        console.log(`[RPG LAND] ${err}`);
    }
});

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

async function _findCommand(commandLine: String, message: Message, currentCommands: CommandMap = commands): Promise<Command | null> {
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
        const number = (await message.getContact()).number;
        const translate = i18n(number);
        message.reply(translate.commands.commons.commandNotFound);
        return null;
    }
}

async function _validateWhitelist(message: Message) {
    const commonsService = ServiceFactory.makeCommonsService();
    const whitelist = await commonsService.getWhitelist();
    const contact = await message.getContact();
    const translate = i18n(contact.number);

    try {
        const foundNumber = whitelist.find(item => item.number === contact.number);
        if (!foundNumber) {
            throw new NotAllowedException();
        } else if (!foundNumber.allow) {
            throw new BotInMaintenanceException();
        }

    } catch (err) {
        if (err instanceof NotAllowedException) {
            console.log(`[RPG LAND] Not Authorized: ${contact.name} | ${contact.number}`);
            message.reply(translate.commands.commons.notAuthorized);
        } else if (err instanceof BotInMaintenanceException) {
            message.reply(translate.commands.commons.botMaintenance);
            console.log(`[RPG LAND] Bot in Maintenance: ${contact.name} | ${contact.number}`);
        } else {
            console.error(err);
            message.reply(translate.commands.commons.somethingWrong);
        }

        throw err;
    }
}