import { CommandGuard } from "../../../core/abstractions/command/command";
import { PlayerModel } from "../../../core/models/player.model";
import { CustomMessage } from "../../../handle_messages";
import { CommandTranslations } from "../../../i18n/translation";

export class ProfileCommand extends CommandGuard {
    player: PlayerModel | null = null;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any; }): void {
        this.i18n = i18n;
        this.player = player;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n && this.player) {
                message.reply(this.i18n.commands.profile(this.player!));
            }
        } catch (err) {
            throw err;
        }
    }
}
