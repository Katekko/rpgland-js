import { Chat } from "whatsapp-web.js";
import { Command } from "../../../core/command";

export class PingCommand extends Command {
    execute(chat: Chat, args: any): Promise<void> | null {
        chat.sendMessage('PONG PONG');
        return null;
    }
}
