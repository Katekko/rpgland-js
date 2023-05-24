import qrcode from 'qrcode-terminal';
import { Client, LocalAuth } from 'whatsapp-web.js';
import { Command } from './core/command';
// import { commands } from './commands';
import { PingCommand } from './features/common/private/ping.command';

const client = new Client({ authStrategy: new LocalAuth() });

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
    const command = _findCommand(0, message.body);
    const args = _findArguments(message.body);

    if (command != null) command.execute(args);
});

client.initialize();

function _findArguments(message: string): string[] {
    const commandChar = '*';
    if (!message.startsWith(commandChar)) return [];

    const commandLine = message.split(commandChar)[1];
    return commandLine.split(' ').slice(1);
}

function _findCommand(currentIndex: number, message: String): Command | null {
    try {
        const commandChar = '*';
        if (message == null || message === '' || !message.startsWith(commandChar)) return null;
        const getCommandLine = message.split(commandChar)[1];
        const allArguments = getCommandLine.split(' ');
        const currentArgument = allArguments[currentIndex];
        const command = commands.get(currentArgument);

        if (command == null) throw new Error();
        if (command instanceof Command) return command;

        return _findCommand(currentIndex + 1, message);
    } catch (error) {
        console.log('command not found');
        return null;
    }
}

let commands: Map<string, any> = new Map<string, any>();
commands.set('ping', new PingCommand());