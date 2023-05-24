import { PingCommand } from './features/common/private/ping.command';

/** All existent commands in the bot */
export let commands: Map<string, any> = new Map<string, any>();
commands.set('ping', new PingCommand());
// commands.set('ping', { 'pong': new PingCommand() });
// commands.set('command2', new Command2());
