import { Message } from "whatsapp-web.js";
import { CommandTranslations, i18n } from "../../../i18n/translation";
import { NeedToStartException } from "../../exceptions/need_to_start.exception";
import { verifyPlayerisStartedMiddleware } from "../../middlewares/verify_player_is_started.middleware";
import { delay } from "../../utils/delay";
import { ServiceFactory } from "../../factories/service.factory";
import { PlayerModel } from "../../models/player.model";

export type CommandMap = {
    [key: string]: Command | CommandMap;
};

export abstract class Command {
    public translate: CommandTranslations;
    private loadPlayer: boolean;

    // Every command will try to fullfill the player
    public player: PlayerModel | null = null;

    getLoadPlayer(): boolean {
        return this.loadPlayer;
      }

    constructor(loadPlayer: boolean | void) {
        this.loadPlayer = loadPlayer ?? true;
        this.translate = i18n(null, 'pt_BR');
    }

    async execute(message: Message, args: any): Promise<void> {
        try {
            if (this.loadPlayer) {
                const playersService = ServiceFactory.makePlayersService();
                const player = await playersService.getPlayerByMessage(message);
                this.player = player;
                this.translate = i18n(null, player?.language ?? 'pt_BR');
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export abstract class CommandGuard extends Command {
    constructor(loadPlayer: boolean | void) {
        super(loadPlayer);
    }

    async execute(message: Message, args: any): Promise<void> {
        try {
            await super.execute(message, args);
            if (!await verifyPlayerisStartedMiddleware(message)) {
                throw new NeedToStartException();
            }
        } catch (err) {
            if (err instanceof NeedToStartException) {
                message.reply(this.translate.commands.commons.needToStart);
            } else {
                message.reply(this.translate.commands.commons.somethingWrong);
                await delay(1000);
            }
            throw err;
        }
    }
}