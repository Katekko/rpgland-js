import { Message } from "whatsapp-web.js";
import { CommandGuard } from "../../../core/abstractions/command/command";
import { ItemType } from "../../../core/enums/item_type.enum";
import { PlayerState } from "../../../core/enums/player_state.enum";
import { ServiceFactory } from "../../../core/factories/service.factory";
import { commandOnlyForPrivate } from "../../../core/middlewares/command_only_for_private.middleware";

export class HealCommand extends CommandGuard {
    async execute(message: Message, args: any): Promise<void> {
        if (await commandOnlyForPrivate(message)) {
            await super.execute(message, args);
            const playerService = ServiceFactory.makePlayersService();

            if (this.player) {
                if (this.player.state != PlayerState.Idle) {
                    message.reply(this.translate.commands.heal.failedToHeal);
                    return;
                }

                const potion = this.player.inventory.find(item => item.type === ItemType.HealthPotion);
                if (potion) {
                    let potionAmount = 1; // Default amount is 1

                    // Check if the player specified a custom amount
                    const userAmount = args[0];
                    if (userAmount && !isNaN(userAmount)) {
                        potionAmount = parseInt(userAmount);
                    }

                    // Find the available potion amount in the player's inventory
                    const availableAmount = potion.amount;

                    // Limit the potion amount based on the available amount in inventory
                    potionAmount = Math.min(potionAmount, availableAmount);

                    // Calculate the total healed amount
                    const maxHealth = this.player.getMaxHealth();
                    const currentHealth = this.player.health;
                    const healedAmount = Math.min(maxHealth - currentHealth, potion.value * potionAmount);

                    // Update the player's health
                    this.player.health += healedAmount;

                    // Update the potion amount in the inventory
                    potion.amount -= potionAmount;

                    // Remove the potion from the inventory if its amount reaches zero
                    if (potion.amount <= 0) {
                        const potionIndex = this.player.inventory.indexOf(potion);
                        this.player.inventory.splice(potionIndex, 1);
                    }

                    // Save the updated player
                    await playerService.savePlayer(this.player);

                    // Send a message to the player confirming the healing
                    message.reply(this.translate.commands.heal.healedWithItem(healedAmount, this.player.health, potion.name));
                } else {
                    message.reply(this.translate.commands.heal.noPotion);
                }
            }
        }
    }
}