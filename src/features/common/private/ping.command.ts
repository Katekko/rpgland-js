import { Command } from "../../../core/abstractions/command/command";
import { CustomMessage } from "../../../handle_messages";
import { CommandTranslations } from "../../../i18n/translation";

export class PingCommand extends Command {
    injectDependencies(i18n: CommandTranslations): void {
        this.i18n = i18n;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        message.reply('PONG PONG NO KATEKKO');
        message.reply(this.i18n!.commands.commons.youAreNotKatekko);
    }
}
