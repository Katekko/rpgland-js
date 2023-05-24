import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/command";
import { PlayerModel } from '../../../core/models/player.model';
import { PlayerService } from "../../../services/player.service";
import { i18n } from '../../../i18n/translation';

export class StartCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const translation = i18n();

        const playerService = new PlayerService();
        const contact = await message.getContact();
        const name = contact.pushname;
        const telephone = contact.number;
        const player = PlayerModel.createNew(name, telephone);

        try {
            const response = await playerService.getPlayerByPhone(player.telephoneNumber);
            if (response == null) {
                await playerService.savePlayer(player);
                message.reply(translation.commands.start.welcome(player.name));
            } else {
                message.reply(translation.commands.start.playerAlreadyStarted);
            }
        } catch (err) {
            console.error('Error adding player:', err);
            message.reply(translation.commands.start.error);
        }
    }
}
