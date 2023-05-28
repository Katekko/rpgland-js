import { Message } from "whatsapp-web.js";
import { Command } from "../../../../core/abstractions/command/command";
import { ServiceFactory } from "../../../../core/factories/service.factory";
import { WhitelistModel } from "../../../../core/models/whitelist.model";
import { commandOnlyForPrivate } from "../../../../core/middlewares/command_only_for_private.middleware";
import { verifyIsKatekkoMiddleware } from "../../../../core/middlewares/verify_is_katekko.middleware";

export class AddWhitelistCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        try {
            if (await commandOnlyForPrivate(message)) {
                if (await verifyIsKatekkoMiddleware(message)) {
                    const commonsService = ServiceFactory.makeCommonsService();
                    const phoneNumber = args[0];
                    const allowed = ((args[1] ?? 'true') === 'true');
                    if (typeof allowed === 'boolean') {
                        const person = new WhitelistModel(phoneNumber, allowed);
                        await commonsService.saveWhitelistEntry(person);
                        message.reply(person.toString());
                    } else {
                        message.reply(this.translate.commands.commons.somethingWrong);
                    }
                } else {
                    message.reply(this.translate.commands.commons.youAreNotKatekko);
                }
            }
        } catch (err) {
            throw err;
        }
    }
}
