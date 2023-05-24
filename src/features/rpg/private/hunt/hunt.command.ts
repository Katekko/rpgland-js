import { Buttons, Message } from "whatsapp-web.js";
import { Command } from "../../../../core/command";
import { MobService } from "../../../../services/mobs.service";
import { MobModel } from "../../../../core/models/mob.model";
import { PlayerService } from "../../../../services/player.service";
import { PlayerState } from "../../../../core/enums/player_state.enum";
import { i18n } from "../../../../i18n/translation";

export class HuntCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const mobService = new MobService();
        const playerService = new PlayerService();
        const translate = i18n();

        const contact = (await message.getContact()).number;
        const player = await playerService.getPlayerByPhone(contact);

        if (player) {
            if (player.state != PlayerState.Idle) {
                message.reply(translate.commands.hunt.find.failedToSearch);
                return;
            }
            const mobs = await mobService.getAllMobs();
            const totalChance = mobs.reduce((sum, mob) => sum + mob.chanceToAppear, 0);
            let randomChance = Math.random() * totalChance;

            let selectedMob: MobModel | undefined;

            for (const mob of mobs) {
                const chance = mob.chanceToAppear / totalChance;
                if (randomChance <= chance) {
                    selectedMob = mob;
                    break;
                }
                randomChance -= chance;
            }

            if (selectedMob) {
                player!.state = PlayerState.Hunting;
                player!.huntAgainst = selectedMob;
                playerService.savePlayer(player);
                message.reply(translate.commands.hunt.find.found(selectedMob));
            }
        } else {
            message.reply(translate.commands.commons.needToStart);
        }
    }
}
