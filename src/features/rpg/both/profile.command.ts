import { Message } from "whatsapp-web.js";
import { CommandGuard } from "../../../core/abstractions/command/command";

export class ProfileCommand extends CommandGuard {
    async execute(message: Message, args: any): Promise<void> {
        try {
            await super.execute(message, args);
            message.reply(this.translate.commands.profile(this.player!));
        } catch (err) {
            throw err;
        }
    }
}
