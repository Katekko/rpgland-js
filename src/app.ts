import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { commands } from './commands';
import { Command } from './core/command';

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
    const lastSubcommandIndex = commandParts.findIndex(part => !commands.has(part));
    return commandParts.slice(lastSubcommandIndex + 1);
}

function _findCommand(commandLine: String): Command | null {
    try {
        const commandParts = commandLine.split(' ');

        let currentCommand: any = commands;
        for (let i = 0; i < commandParts.length; i++) {
            const currentArgument = commandParts[i];
            const command = currentCommand.get(currentArgument);

            if (command == null) throw new Error();

            if (command instanceof Command) {
                return command;
            } else if (command instanceof Map) {
                currentCommand = command;
            } else {
                throw new Error();
            }
        }

        throw new Error();
    } catch (error) {
        console.log('command not found');
        return null;
    }
}