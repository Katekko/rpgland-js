import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/abstractions/command/command";
import { ServiceFactory } from "../../../core/factories/service.factory";
import { commandOnlyForPrivate } from "../../../core/middlewares/command_only_for_private.middleware";

export class InventoryCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        if (await commandOnlyForPrivate(message)) {
            const playerService = ServiceFactory.makePlayersService();
            const player = await playerService.getPlayerByMessage(message);

            if (player) {
                const inventory = player.inventory;
                if (inventory.length > 0) {
                    message.reply(this.translate.commands.inventory.open(player));
                } else {
                    message.reply(this.translate.commands.inventory.emptyInventory);
                }
            }
        }
    }
}
