import { Message } from "whatsapp-web.js";
import { CommandGuard } from "../../../core/abstractions/command/command";
import { commandOnlyForPrivate } from "../../../core/middlewares/command_only_for_private.middleware";

export class InventoryCommand extends CommandGuard {
    async execute(message: Message, args: any): Promise<void> {
        if (await commandOnlyForPrivate(message)) {
            await super.execute(message, args);
            if (this.player) {
                const inventory = this.player.inventory;
                if (inventory.length > 0) {
                    message.reply(this.translate.commands.inventory.open(this.player));
                } else {
                    message.reply(this.translate.commands.inventory.emptyInventory);
                }
            }
        }
    }
}
