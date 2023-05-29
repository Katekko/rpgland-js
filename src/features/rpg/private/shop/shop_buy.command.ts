import { Command } from "../../../../core/abstractions/command/command";
import { ItemType } from "../../../../core/enums/item_type.enum";
import { PlayerState } from "../../../../core/enums/player_state.enum";
import { ItemFactory } from "../../../../core/factories/item.factory";
import { commandOnlyForPrivate } from "../../../../core/middlewares/command_only_for_private.middleware";
import { PlayerModel } from "../../../../core/models/player.model";
import { CustomMessage } from "../../../../handle_messages";
import { CommandTranslations } from "../../../../i18n/translation";
import { PlayersService } from "../../../../services/players.service";

export class ShopBuyCommand extends Command {
    player: PlayerModel | null = null;
    playersService: PlayersService | null = null;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any; }): void {
        this.i18n = i18n;
        this.player = player;
        this.playersService = services.PlayersService;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n) {
                if (this.player) {
                    if (this.player.state != PlayerState.Idle) {
                        message.reply(this.i18n.commands.shop.notIdle);
                        return;
                    }

                    const itemName = args.slice(0, -1).join(' ');
                    const quantity = parseInt(args[args.length - 1]);

                    if (!itemName || !quantity) {
                        message.reply(this.i18n.commands.shop.missingArguments);
                        return;
                    }

                    const itemsToShop = ItemFactory.makeItemsToShop();
                    const item = itemsToShop.find((item) => item.name.toLowerCase() === itemName.toLowerCase());
                    if (!item) {
                        message.reply(this.i18n.commands.shop.itemNotFound(itemName));
                        return;
                    }

                    const totalPrice = item.price * quantity;

                    const coinItem = this.player.inventory.find((item) => item.type === ItemType.Currency);
                    if (!coinItem || coinItem.amount < totalPrice) {
                        message.reply(this.i18n.commands.shop.insufficientCoins(item.name));
                        return;
                    }

                    coinItem.amount -= totalPrice;

                    const existingItem = this.player.inventory.find(e => e.id === item.id);

                    if (existingItem) {
                        existingItem.amount += quantity;
                    } else {
                        const newItem = ItemFactory.makeItemByType(item.type);
                        newItem.amount = quantity;
                        this.player.inventory.push(newItem);
                    }

                    await this.playersService!.savePlayer(this.player);
                    message.reply(this.i18n.commands.shop.buy(item, quantity, totalPrice));
                }
            }
        } catch (err) {
            throw err;
        }
    }
}
