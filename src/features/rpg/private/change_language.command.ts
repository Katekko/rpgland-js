import { Command } from "../../../core/abstractions/command/command";
import { commandOnlyForPrivate } from "../../../core/middlewares/command_only_for_private.middleware";
import { PlayerModel } from "../../../core/models/player.model";
import { CommandTranslations } from "../../../i18n/translation";
import { CustomMessage } from "../../../handle_messages";
import { PlayersService } from "../../../services/players.service";

export class ChangeLanguageCommand extends Command {
    player: PlayerModel | null = null;
    playersService: PlayersService | null = null;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any; }): void {
        this.i18n = i18n;
        this.player = player;
        this.playersService = services.PlayersService;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n) {
                if (await commandOnlyForPrivate(message, this.i18n)) {
                    if (this.player) {
                        const languages = ['pt_BR', 'en'];
                        const language = args[0];
                        if (language && languages.includes(language)) {
                            this.player.language = language;
                            await this.playersService!.savePlayer(this.player);
                            message.reply(this.i18n.commands.language.changed(language));
                        } else {
                            message.reply(this.i18n.commands.language.error);
                        }
                    }
                }
            }
        } catch (err) {
            throw err;
        }
    }
}
