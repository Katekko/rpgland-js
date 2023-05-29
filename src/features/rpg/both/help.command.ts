import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/abstractions/command/command";
import { PlayerModel } from "../../../core/models/player.model";
import { CommandTranslations } from "../../../i18n/translation";
import { CustomMessage } from "../../../handle_messages";

export class HelpCommand extends Command {
    injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any; }): void {
        this.i18n = i18n;
    }
    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n) {
                message.reply(`${this.i18n.commands.help.title}
                \n\n${this.i18n.commands.help.start}
                \n\n${this.i18n.commands.help.hunt}
                \n\n${this.i18n.commands.help.heal}
                \n\n${this.i18n.commands.help.shop}
                \n\n${this.i18n.commands.help.profile}
                \n\n${this.i18n.commands.help.ranking}`);
            }
        } catch (err) {
            throw err;
        }
    }
}
