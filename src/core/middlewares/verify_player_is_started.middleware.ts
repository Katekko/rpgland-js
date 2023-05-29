import { CustomMessage } from "../../handle_messages";
import { ServiceFactory } from "../factories/service.factory";

export async function verifyPlayerisStartedMiddleware(message: CustomMessage): Promise<boolean> {
    const playerService = ServiceFactory.makePlayersService();
    const response = await playerService.getPlayerByMessage(message);
    return response != null;
}