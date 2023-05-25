import { Message } from "whatsapp-web.js";
import { CommandGuard } from "../../../core/command";
import { i18n } from "../../../i18n/translation";
import { PlayerService } from "../../../services/player.service";

export class PerfilCommand extends CommandGuard {
    async execute(message: Message, args: any): Promise<void> {
        try {
            await super.execute(message, args);
            const translate = i18n();

            const playerService = new PlayerService();
            const player = await playerService.getPlayerByMessage(message);
            message.reply(translate.commands.perfil(player!));
        } catch (err) {
            // custom log here
            console.log(err);
        }
    }
}
