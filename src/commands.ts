import { CommandMap } from './core/command';
import { PingCommand } from './features/common/private/ping.command';
import { HelpCommand } from './features/rpg/both/help.command';

/** All existent commands in the bot */
export const commands: CommandMap = {
    ping: new PingCommand(),
    help: new HelpCommand(),
};
