import { Message } from "whatsapp-web.js";
import { verifyPlayerisStartedMiddleware } from "../../middlewares/verify_player_is_started.middleware";
import { i18n } from "../../../i18n/translation";
import { NeedToStartException } from "../../exceptions/need_to_start.exception";
import { delay } from "../../utils/delay";

export type CommandMap = {
    [key: string]: Command | CommandMap;
};

export abstract class Command {
    public translate = i18n();
    abstract execute(message: Message, args: any): Promise<void>;
}

export abstract class CommandGuard extends Command {
    async execute(message: Message, args: any): Promise<void> {
        try {
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