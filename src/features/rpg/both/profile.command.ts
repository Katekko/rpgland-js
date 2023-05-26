import { Message } from "whatsapp-web.js";
import { CommandGuard } from "../../../core/abstractions/command/command";
import { i18n } from "../../../i18n/translation";
import { PlayerService } from "../../../services/player.service";

export class ProfileCommand extends CommandGuard {
    async execute(message: Message, args: any): Promise<void> {
        try {
            await super.execute(message, args);
            const translate = i18n();

            const playerService = new PlayerService();
            const player = await playerService.getPlayerByMessage(message);
            message.reply(translate.commands.profile(player!));
        } catch (err) {
            // custom log here
            console.log(err);
        }
    }
}
