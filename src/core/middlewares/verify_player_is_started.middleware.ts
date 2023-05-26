import { Message } from "whatsapp-web.js";
import { ServiceFactory } from "../factories/service.factory";

export async function verifyPlayerisStartedMiddleware(message: Message): Promise<boolean> {
    const playerService = ServiceFactory.makePlayersService();
    const response = await playerService.getPlayerByMessage(message);
    return response != null;
}