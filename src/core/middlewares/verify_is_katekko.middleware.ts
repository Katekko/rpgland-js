import { Message } from "whatsapp-web.js";

export async function verifyIsKatekkoMiddleware(message: Message): Promise<boolean> {
    const number = (await message.getContact()).number;
    return number == '5527999912909';
}