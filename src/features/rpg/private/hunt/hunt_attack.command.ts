import { Message } from "whatsapp-web.js";
import { CommandGuard } from "../../../../core/abstractions/command/command";
import { PlayerState } from "../../../../core/enums/player_state.enum";
import { ItemFactory } from "../../../../core/factories/item.factory";
import { ServiceFactory } from "../../../../core/factories/service.factory";
import { commandOnlyForPrivate } from "../../../../core/middlewares/command_only_for_private.middleware";

export class HuntAttackCommand extends CommandGuard {
    async execute(message: Message, args: any): Promise<void> {
        try {
            if (await commandOnlyForPrivate(message)) {
                await super.execute(message, args);
                const playerService = ServiceFactory.makePlayersService();

                if (this.player) {
                    if (this.player.state != PlayerState.Hunting) {
                        message.reply(this.translate.commands.hunt.attack.failedToAttack);
                        return;
                    }
                    
                    const mob = this.player!.huntAgainst!;
                    const realAttack = this.player.getRandomAttack();
                    mob.health -= realAttack;
                    message.reply(this.translate.commands.hunt.attack.attacking(mob.name, realAttack, mob.health))

                    // Player kill the mob
                    if (mob.health <= 0) {
                        this.player.state = PlayerState.Idle;
                        this.player.huntAgainst = null;
                        this.player.exp += mob.expDrop;
                        message.reply(this.translate.commands.hunt.attack.mobDefeated(mob.name, mob.expDrop));

                        mob.itemsDrop.forEach((item) => {
                            if (Math.random() <= item.dropChance) {
                                const itemQuantity = Math.floor(Math.random() * item.amount * mob.level) + 1;
                                const newItem = ItemFactory.makeItemByType(item.type);
                                newItem.amount = itemQuantity;
                                const existingItemIndex = this.player!.inventory.findIndex(existingItem => existingItem.type === item.type);

                                if (existingItemIndex !== -1) {
                                    this.player!.inventory[existingItemIndex].amount += newItem.amount;
                                } else {
                                    this.player!.inventory.push(newItem);
                                }
                                message.reply(this.translate.commands.hunt.attack.itemFound(newItem));
                            }
                        });

                        // Player levelup
                        if (this.player.exp >= this.player.getExpNeededForNextLevel()) {
                            const remainingExp = this.player.exp - this.player.getExpNeededForNextLevel();
                            this.player.level++;
                            this.player.exp = remainingExp;
                            message.reply(this.translate.commands.hunt.attack.levelUp(this.player.level));
                        }

                        await playerService.savePlayer(this.player);
                        return;
                    }

                    setTimeout(async () => {
                        const mobAttack = mob.attack;
                        const randomMobDamage = Math.random() * (mobAttack - 1) + 1;
                        const roundedMobDamage = Math.round(randomMobDamage);
                        this.player!.health -= roundedMobDamage;

                        await playerService.savePlayer(this.player!);

                        message.reply(this.translate.commands.hunt.attack.attacked(mob.name, roundedMobDamage, this.player!.health));
                        if (this.player!.health <= 0) {
                            this.player!.setPlayerDeath();
                            message.reply(this.translate.commands.hunt.attack.defeated(mob.name));
                        }

                        playerService.savePlayer(this.player!);
                    }, 100);
                }
            }
        } catch (err) {
            // apply log here
            console.log(err);
        }
    }
}


