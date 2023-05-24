import { Chat } from "whatsapp-web.js";

export type CommandMap = {
    [key: string]: Command | CommandMap;
};

export abstract class Command {
    abstract execute(chat: Chat, args: any): Promise<void> | null;
}