import { CommandGuard } from "../../../core/abstractions/command/command";
import { ItemType } from "../../../core/enums/item_type.enum";
import { PlayerState } from "../../../core/enums/player_state.enum";
import { commandOnlyForPrivate } from "../../../core/middlewares/command_only_for_private.middleware";
import { PlayerModel } from "../../../core/models/player.model";
import { CustomMessage } from "../../../handle_messages";
import { CommandTranslations } from "../../../i18n/translation";
import { PlayersService } from "../../../services/players.service";

export class HealCommand extends CommandGuard {
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
                        message.reply(this.i18n.commands.heal.failedToHeal);
                        return;
                    }

                    const potion = this.player.inventory.find(item => item.type === ItemType.HealthPotion);
                    if (potion) {
                        let potionAmount = 1;


                        const userAmount = args[0];
                        if (userAmount && !isNaN(userAmount)) {
                            potionAmount = parseInt(userAmount);
                        }


                        const availableAmount = potion.amount;
                        potionAmount = Math.min(potionAmount, availableAmount);

                        const maxHealth = this.player.getMaxHealth();
                        const currentHealth = this.player.health;
                        const healedAmount = Math.min(maxHealth - currentHealth, potion.value * potionAmount);

                        this.player.health += healedAmount;

                        potion.amount -= potionAmount;

                        if (potion.amount <= 0) {
                            const potionIndex = this.player.inventory.indexOf(potion);
                            this.player.inventory.splice(potionIndex, 1);
                        }

                        await this.playersService!.savePlayer(this.player);

                        message.reply(this.i18n.commands.heal.healedWithItem(healedAmount, this.player.health, potion.name));
                    } else {
                        message.reply(this.i18n.commands.heal.noPotion);
                    }
                }
            }
        } catch (err) {
            throw err;
        }
    }
}