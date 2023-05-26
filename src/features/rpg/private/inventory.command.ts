import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/abstractions/command/command";
import { ServiceFactory } from "../../../core/factories/service.factory";

export class InventoryCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
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
