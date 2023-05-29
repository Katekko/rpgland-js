import { Command } from "../../../core/abstractions/command/command";
import { PlayerModel } from "../../../core/models/player.model";
import { CustomMessage } from "../../../handle_messages";
import { CommandTranslations } from "../../../i18n/translation";
import { PlayersService } from "../../../services/players.service";

export class RankingCommand extends Command {
    playersService: PlayersService | null = null;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any; }): void {
        this.i18n = i18n;
        this.playersService = services.PlayersService;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n) {
                const players = await this.playersService!.getAllPlayers();

                players.sort((a, b) => {
                    if (a.level !== b.level) {
                        return b.level - a.level;
                    } else {
                        return b.exp - a.exp;
                    }
                });

                message.reply(this.i18n.commands.ranking.leaderboard(players));
            }
        } catch (err) {
            throw err;
        }
    }
}