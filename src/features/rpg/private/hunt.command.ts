import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/command";
import { MobService } from "../../../services/mobs.service";
import { MobModel } from "../../../core/models/mob.model";

export class HuntCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        const mobService = new MobService();
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
            message.reply(`Selected mob: ${selectedMob.name}`);
        }
    }
}
