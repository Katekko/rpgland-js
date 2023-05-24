import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/command";

export class PingCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const chat = await message.getChat();
        chat.sendMessage('PONG PONG');
    }
}
