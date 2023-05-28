import { Message } from "whatsapp-web.js";
import { Command } from "../../../../core/abstractions/command/command";
import { commandOnlyForPrivate } from "../../../../core/middlewares/command_only_for_private.middleware";
import { ServiceFactory } from "../../../../core/factories/service.factory";

export class MigrateItemsCommand extends Command {
    constructor() { super(false) }

    async execute(message: Message, args: any): Promise<void> {
        try {
            if (await commandOnlyForPrivate(message)) {
                await super.execute(message, args);
                await ServiceFactory.makeItemsService().migrate();
                await ServiceFactory.makeMobsService().migrate();
                await ServiceFactory.makePlayersService().migrate();
                message.reply(this.translate.commands.migrate.all);
            }
        } catch (err) {
            message.reply(this.translate.commands.migrate.error);
            throw err;
        }
    }
}
