import { v4 as uuidv4 } from 'uuid';
import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/command";
import { PlayerData } from '../../../core/models/player.model';
import { PlayerService } from "../../../services/player.service";
import { i18n } from '../../../i18n/translation';

export class StartCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const translation = i18n();

        const playerService = new PlayerService();
        const name = (await message.getContact()).pushname;
        const player = new PlayerData(uuidv4(), name);

        try {
            await playerService.startPlayer(player);
            message.reply(translation.commands.start.welcome(player.name));
        } catch (err) {
            console.error('Error adding player:', err);
            message.reply(translation.commands.start.error);
        }
    }
}
