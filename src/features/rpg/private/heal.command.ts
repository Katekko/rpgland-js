import { Message } from "whatsapp-web.js";
import { CommandGuard } from "../../../core/abstractions/command/command";
import { PlayerService } from "../../../services/player.service";
import { ItemType } from "../../../core/enums/item_type.enum";
import { PlayerState } from "../../../core/enums/player_state.enum";

export class HealCommand extends CommandGuard {
    async execute(message: Message, args: any): Promise<void> {
        super.execute(message, args);
        const playerService = new PlayerService();
        const player = await playerService.getPlayerByMessage(message);

        if (player) {
            if (player.state != PlayerState.Idle) {
                message.reply(this.translate.commands.heal.failedToHeal);
                return;
            }

            const potion = player.inventory.find(item => item.type === ItemType.HealthPotion);
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
                const maxHealth = player.getMaxHealth();
                const currentHealth = player.health;
                const healedAmount = Math.min(maxHealth - currentHealth, potion.value * potionAmount);

                // Update the player's health
                player.health += healedAmount;

                // Update the potion amount in the inventory
                potion.amount -= potionAmount;

                // Remove the potion from the inventory if its amount reaches zero
                if (potion.amount <= 0) {
                    const potionIndex = player.inventory.indexOf(potion);
                    player.inventory.splice(potionIndex, 1);
                }

                // Save the updated player
                await playerService.savePlayer(player);

                // Send a message to the player confirming the healing
                message.reply(this.translate.commands.heal.healedWithItem(healedAmount, player.health, potion.name));
            } else {
                message.reply(this.translate.commands.heal.noPotion);
            }
        }
    }
}