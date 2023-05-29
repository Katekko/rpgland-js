import { Command } from "../../../../core/abstractions/command/command";
import { PlayerState } from "../../../../core/enums/player_state.enum";
import { ItemFactory } from "../../../../core/factories/item.factory";
import { commandOnlyForPrivate } from "../../../../core/middlewares/command_only_for_private.middleware";
import { PlayerModel } from "../../../../core/models/player.model";
import { CustomMessage } from "../../../../handle_messages";
import { CommandTranslations } from "../../../../i18n/translation";

export class ShopCommand extends Command {
    player: PlayerModel | null = null;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any; }): void {
        this.i18n = i18n;
        this.player = player;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n) {
                if (await commandOnlyForPrivate(message, this.i18n)) {
                    if (this.player) {
                        if (this.player.state != PlayerState.Idle) {
                            message.reply(this.i18n.commands.shop.notIdle);
                            return;
                        }
                    }

                    const items = ItemFactory.makeItemsToShop();
                    message.reply(this.i18n.commands.shop.info(items));
                }
            }
        } catch (err) {
            throw err;
        }
    }
}