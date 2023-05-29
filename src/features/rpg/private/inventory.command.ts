import { CommandGuard } from "../../../core/abstractions/command/command";
import { PlayerModel } from "../../../core/models/player.model";
import { CustomMessage } from "../../../handle_messages";
import { CommandTranslations } from "../../../i18n/translation";

export class InventoryCommand extends CommandGuard {
    player: PlayerModel | null = null;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel, services: { [key: string]: any; }): void {
        this.i18n = i18n;
        this.player = player;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n) {
                if (this.player) {
                    const inventory = this.player.inventory;
                    if (inventory.length > 0) {
                        message.reply(this.i18n.commands.inventory.open(this.player));
                    } else {
                        message.reply(this.i18n.commands.inventory.emptyInventory);
                    }
                }
            } else {
                throw ReferenceError();
            }
        } catch (err) {
            throw err;
        }
    }
}
