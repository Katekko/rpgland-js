import { CustomMessage } from "../../handle_messages";
import { ServiceFactory } from "../factories/service.factory";

export async function verifyPlayerisStartedMiddleware(message: CustomMessage): Promise<boolean> {
    const playersService = ServiceFactory.makePlayersService();
    const response = await playersService.getPlayerByMessage(message);
    return response != null;
}