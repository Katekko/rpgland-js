import { Chat } from "whatsapp-web.js";
import { Command } from "../../../core/command";
import { i18n } from "../../../i18n/translation";

export class HelpCommand extends Command {
    execute(chat: Chat, args: any): Promise<void> | null {
        const translation = i18n();
        chat.sendMessage(`${translation.commands.help.title}\n\n${translation.commands.help.start}\n${translation.commands.help.hunt}\n${translation.commands.help.heal}\n${translation.commands.help.shop}`)
        return null;
    }
}
