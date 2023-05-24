import { Message } from "whatsapp-web.js";
import { Command } from "../../../../core/command";
import { PlayerState } from "../../../../core/enums/player_state.enum";
import { i18n } from "../../../../i18n/translation";
import { PlayerService } from "../../../../services/player.service";

export class HuntAttackCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const playerService = new PlayerService();
        const translate = i18n();

        const player = await playerService.getPlayerByMessage(message);
        if (player) {
            if (player.state != PlayerState.Hunting) {
                message.reply(translate.commands.hunt.attack.failedToAttack);
                return;
            }

            const mob = player.huntAgainst!;
            const playerAttack = player.getRealAttack();
            const randomDamage = Math.random() * (playerAttack - 1) + 1;
            const roundedDamage = Math.round(randomDamage);

            mob.health -= roundedDamage;
            message.reply(translate.commands.hunt.attack.attacking(mob.name, roundedDamage, mob.health))

            if (mob.health <= 0) {
                player.state = PlayerState.Idle;
                player.huntAgainst = null;
                player.exp += mob.expDrop;
                message.reply(translate.commands.hunt.attack.mobDefeated(mob.name, mob.expDrop));
                playerService.savePlayer(player);
                return;
            }

            setTimeout(async () => {
                const mobAttack = mob.attack;
                const randomMobDamage = Math.random() * (mobAttack - 1) + 1;
                const roundedMobDamage = Math.round(randomMobDamage);

                player.health -= roundedMobDamage;

                await playerService.savePlayer(player);

                message.reply(translate.commands.hunt.attack.attacked(mob.name, roundedMobDamage, player.health));


                if (player.health <= 0) {
                    player.setPlayerDeath();
                    message.reply(translate.commands.hunt.attack.defeated(mob.name));
                }

                playerService.savePlayer(player);
            }, 1000);
        }
    }
}


