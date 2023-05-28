import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/abstractions/command/command";

export class HelpCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        try {
            await super.execute(message, args);
            const chat = await message.getChat();
            chat.sendMessage(`${this.translate.commands.help.title}
            \n\n${this.translate.commands.help.start}
            \n\n${this.translate.commands.help.hunt}
            \n\n${this.translate.commands.help.heal}
            \n\n${this.translate.commands.help.shop}
            \n\n${this.translate.commands.help.profile}
            \n\n${this.translate.commands.help.ranking}`);
        } catch (err) {
            throw err;
        }
    }
}
