import { Message } from "whatsapp-web.js";
import { Command } from "../../../../core/abstractions/command/command";
import { commandOnlyForPrivate } from "../../../../core/middlewares/command_only_for_private.middleware";
import { verifyIsKatekkoMiddleware } from "../../../../core/middlewares/verify_is_katekko.middleware";
import { PlayerModel } from "../../../../core/models/player.model";
import { WhitelistModel } from "../../../../core/models/whitelist.model";
import { CommandTranslations } from "../../../../i18n/translation";
import { CustomMessage } from "../../../../handle_messages";
import { CommonsService } from "../../../../services/commons.service";

export class AddWhitelistCommand extends Command {
    commonsService: CommonsService | null = null;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any; }): void {
        this.i18n = i18n;
        this.commonsService = services.CommonsService;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n) {
                if (await verifyIsKatekkoMiddleware(message)) {
                    const phoneNumber = args[0];
                    const allowed = ((args[1] ?? 'true') === 'true');
                    if (typeof allowed === 'boolean') {
                        const person = new WhitelistModel(phoneNumber, allowed);
                        await this.commonsService!.saveWhitelistEntry(person);
                        message.reply(person.toString());
                    } else {
                        message.reply(this.i18n.commands.commons.somethingWrong);
                    }
                } else {
                    message.reply(this.i18n.commands.commons.youAreNotKatekko);
                }
            }
        } catch (err) {
            throw err;
        }
    }
}
