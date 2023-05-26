import { Message } from "whatsapp-web.js";
import { Command } from "../../../../core/abstractions/command/command";
import { PlayerState } from "../../../../core/enums/player_state.enum";
import { ItemFactory } from "../../../../core/factories/item.factory";
import { ServiceFactory } from "../../../../core/factories/service.factory";
import { commandOnlyForPrivate } from "../../../../core/middlewares/command_only_for_private.middleware";

export class ShopCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        if (await commandOnlyForPrivate(message)) {
            const playerService = ServiceFactory.makePlayersService();
            const player = await playerService.getPlayerByMessage(message);
            if (player) {
                if (player.state != PlayerState.Idle) {
                    message.reply(this.translate.commands.shop.notIdle);
                    return;
                }
            }

            const items = ItemFactory.makeItemsToShop();
            message.reply(this.translate.commands.shop.info(items));
        }
    }
}