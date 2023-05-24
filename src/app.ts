import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { commands } from './commands';
import { Command, CommandMap } from './core/command';

const client = new Client({ authStrategy: new LocalAuth() });
const commandChar = '!';

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    const body = message.body;
    if (!body.startsWith(commandChar)) return null;
    const commandLine = body.split(commandChar)[1];

    const command = _findCommand(commandLine);
    const args = _findArguments(commandLine);

    if (command != null) command.execute(args);
});

client.initialize();

function _findArguments(commandLine: string): string[] {
    const commandParts = commandLine.split(' ');
    const lastSubcommandIndex = commandParts.findIndex(part => !(part in commands));
    return commandParts.slice(lastSubcommandIndex + 1);
}

function _findCommand(commandLine: String, currentCommands: CommandMap = commands): Command | null {
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
        console.log('command not found');
        return null;
    }
}