import { Command } from "../../../core/abstractions/command/command";
import { verifyPlayerisStartedMiddleware } from "../../../core/middlewares/verify_player_is_started.middleware";
import { PlayerModel } from '../../../core/models/player.model';
import { CustomMessage } from "../../../handle_messages";
import { CommandTranslations } from "../../../i18n/translation";
import { PlayersService } from "../../../services/players.service";

export class StartCommand extends Command {
    playersService: PlayersService | undefined;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any }): void {
        this.i18n = i18n;
        this.playersService = services.PlayerService;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            const translate = this.i18n;
            if (translate && this.playersService) {
                const playerStarted = await verifyPlayerisStartedMiddleware(message);
                const player = PlayerModel.createNew(message.name, message.phone);
                try {
                    if (!playerStarted) {
                        await this.playersService.savePlayer(player);
                        message.reply(translate.commands.start.welcome(player.name));
                    } else {
                        message.reply(translate.commands.start.playerAlreadyStarted);
                    }
                } catch (err) {
                    console.error('Error adding player:', err);
                    message.reply(this.i18n!.commands.start.error);
                }
            } else {
                throw ReferenceError();
            }
        } catch (err) {
            throw err;
        }
    }
}
