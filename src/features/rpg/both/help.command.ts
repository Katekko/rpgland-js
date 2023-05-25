import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/command";
import { i18n } from "../../../i18n/translation";

export class HelpCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const chat = await message.getChat();
        chat.sendMessage(`${this.translate.commands.help.title}\n\n${this.translate.commands.help.start}\n\n${this.translate.commands.help.hunt}\n\n${this.translate.commands.help.heal}\n\n${this.translate.commands.help.shop}`)
    }
}
