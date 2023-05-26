import { Message } from "whatsapp-web.js";
import { Command } from "../../../../core/abstractions/command/command";
import { ItemType } from "../../../../core/enums/item_type.enum";
import { PlayerState } from "../../../../core/enums/player_state.enum";
import { ItemFactory } from "../../../../core/factories/item.factory";
import { ServiceFactory } from "../../../../core/factories/service.factory";
import { commandOnlyForPrivate } from "../../../../core/middlewares/command_only_for_private.middleware";

export class ShopBuyCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        if (await commandOnlyForPrivate(message)) {
            const playerService = ServiceFactory.makePlayersService();
            const player = await playerService.getPlayerByMessage(message);
            if (player) {
                if (player.state != PlayerState.Idle) {
                    message.reply(this.translate.commands.shop.notIdle);
                    return;
                }

                const itemName = args.slice(0, -1).join(' ');
                const quantity = parseInt(args[args.length - 1]);

                if (!itemName || !quantity) {
                    message.reply(this.translate.commands.shop.missingArguments);
                    return;
                }

                const itemsToShop = ItemFactory.makeItemsToShop();
                const item = itemsToShop.find((item) => item.name.toLowerCase() === itemName.toLowerCase());
                if (!item) {
                    message.reply(this.translate.commands.shop.itemNotFound(itemName));
                    return;
                }

                const totalPrice = item.price * quantity;

                const coinItem = player.inventory.find((item) => item.type === ItemType.Currency);
                if (!coinItem || coinItem.amount < totalPrice) {
                    message.reply(this.translate.commands.shop.insufficientCoins(item.name));
                    return;
                }

                coinItem.amount -= totalPrice;

                const existingItem = player.inventory.find(e => e.id === item.id);

                if (existingItem) {
                    existingItem.amount += quantity;
                } else {
                    const newItem = ItemFactory.makeItemByType(item.type);
                    newItem.amount = quantity;
                    player.inventory.push(newItem);
                }

                await playerService.savePlayer(player);
                message.reply(this.translate.commands.shop.buy(item, quantity, totalPrice));
            }
        }
    }
}
