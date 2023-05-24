import { Command } from "../../../core/command";

export class PingCommand extends Command {
    execute(args: any): Promise<void> | null {
        console.log('execute ping args: ' + args);
        return null;
    }
}
