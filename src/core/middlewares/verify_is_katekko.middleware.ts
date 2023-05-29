import { CustomMessage } from "../../handle_messages";

export function verifyIsKatekkoMiddleware(message: CustomMessage): boolean {
    const number = message.phone;
    return number == '5527999912909';
}