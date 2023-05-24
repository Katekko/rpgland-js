import { CommandMap } from './core/command';
import { PingCommand } from './features/common/private/ping.command';
import { HelpCommand } from './features/rpg/both/help.command';
import { HuntCommand } from './features/rpg/private/hunt/hunt.command';
import { HuntAttackCommand } from './features/rpg/private/hunt/hunt_attack.command';
import { StartCommand } from './features/rpg/private/start.command';

/** All existent commands in the bot */
export const commands: CommandMap = {
    ping: new PingCommand(),
    help: new HelpCommand(),
    start: new StartCommand(),
    hunt: {
        find: new HuntCommand(),
        attack: new HuntAttackCommand(),
    },
};
