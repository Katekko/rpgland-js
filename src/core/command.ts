import { Message } from "whatsapp-web.js";

export type CommandMap = {
    [key: string]: Command | CommandMap;
};

export abstract class Command {
    abstract execute(chat: Message, args: any): Promise<void>;
}