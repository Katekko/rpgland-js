import { Message } from "whatsapp-web.js";
import { Command } from "../../../../core/command";
import { ItemFactory } from "../../../../core/factories/item.factory";

export class ShopCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const items = ItemFactory.makeItemsToShop();
        message.reply(this.translate.commands.shop.info(items));
    }
}
