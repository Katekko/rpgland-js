import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/command";
import { i18n } from "../../../i18n/translation";

export class HelpCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const translation = i18n();
        const chat = await message.getChat();
        chat.sendMessage(`${translation.commands.help.title}\n\n${translation.commands.help.start}\n${translation.commands.help.hunt}\n${translation.commands.help.heal}\n${translation.commands.help.shop}`)
    }
}
