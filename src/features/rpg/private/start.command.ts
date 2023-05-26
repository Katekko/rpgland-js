import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/abstractions/command/command";
import { ServiceFactory } from "../../../core/factories/service.factory";
import { verifyPlayerisStartedMiddleware } from "../../../core/middlewares/verify_player_is_started.middleware";
import { PlayerModel } from '../../../core/models/player.model';
import { i18n } from '../../../i18n/translation';

export class StartCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const playerStarted = await verifyPlayerisStartedMiddleware(message);

        const translate = i18n();
        const playerService = ServiceFactory.makePlayersService();
        const contact = await message.getContact();
        const name = contact.pushname;
        const telephone = contact.number;
        const player = PlayerModel.createNew(name, telephone);

        try {
            if (!playerStarted) {
                await playerService.savePlayer(player);
                message.reply(translate.commands.start.welcome(player.name));
            } else {
                message.reply(translate.commands.start.playerAlreadyStarted);
            }
        } catch (err) {
            console.error('Error adding player:', err);
            message.reply(translate.commands.start.error);
        }
    }
}
