import { Message } from "whatsapp-web.js";
import { PlayerService } from "../../services/player.service";

export async function verifyPlayerisStartedMiddleware(message: Message): Promise<boolean> {
    const playerService = new PlayerService();
    const response = await playerService.getPlayerByMessage(message);
    return response != null;
}