import { CommandGuard } from "../../../core/abstractions/command/command";
import { ItemType } from "../../../core/enums/item_type.enum";
import { PlayerModel } from "../../../core/models/player.model";
import { CustomMessage } from "../../../handle_messages";
import { CommandTranslations } from "../../../i18n/translation";
import { PlayersService } from "../../../services/players.service";

export class EquipItemCommand extends CommandGuard {
    player: PlayerModel | null = null;
    playersService: PlayersService | null = null;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel, services: { [key: string]: any; }): void {
        this.i18n = i18n;
        this.player = player;
        this.playersService = services.PlayersService;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n && this.player) {
                const itemName = args.join(' ');

                if (itemName) {
                    const itemToEquip = this.player.inventory.find((item) => item.name.toLowerCase() === itemName.toLowerCase() && !item.equipped);
                    if (itemToEquip) {
                        if (itemToEquip.type === ItemType.Weapon) {
                            const equippedWeapon = this.player.inventory.find((item) => item.equipped && item.type === ItemType.Weapon);
                            if (equippedWeapon) {
                                equippedWeapon.equipped = false;
                            }

                            itemToEquip.equipped = true;
                            await this.playersService!.savePlayer(this.player);

                            message.reply(this.i18n.commands.equip.success(itemName));
                        } else {
                            message.reply(this.i18n.commands.equip.notWeapon(itemName));
                        }
                    } else {
                        message.reply(this.i18n.commands.equip.notFoundOrEquipped(itemName));
                    }
                } else {
                    message.reply(this.i18n.commands.equip.noItemProvided);
                }
            } else {
                throw new ReferenceError('Dependencies not injected');
            }
        } catch (err) {
            throw err;
        }
    }
}
