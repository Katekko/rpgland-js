import { Message } from "whatsapp-web.js";
import { Command } from "../../../../core/abstractions/command/command";
import { ItemFactory } from "../../../../core/factories/item.factory";
import { PlayerService } from "../../../../services/player.service";
import { PlayerState } from "../../../../core/enums/player_state.enum";

export class ShopCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const playerService = new PlayerService();
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