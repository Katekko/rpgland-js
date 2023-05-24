import { CommandMap } from './core/command';
import { PingCommand } from './features/common/private/ping.command';

/** All existent commands in the bot */
export const commands: CommandMap = {
    ping: new PingCommand(),
    katekko: {
        gostoso: new PingCommand(),
    },
};

// commands.set('command2', new Command2());
