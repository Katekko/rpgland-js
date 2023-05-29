import { CommandGuard } from "../../../../core/abstractions/command/command";
import { PlayerState } from "../../../../core/enums/player_state.enum";
import { commandOnlyForPrivate } from "../../../../core/middlewares/command_only_for_private.middleware";
import { MobModel } from "../../../../core/models/mob.model";
import { PlayerModel } from "../../../../core/models/player.model";
import { CustomMessage } from "../../../../handle_messages";
import { CommandTranslations } from "../../../../i18n/translation";
import { MobsService } from "../../../../services/mobs.service";
import { PlayersService } from "../../../../services/players.service";

export class HuntCommand extends CommandGuard {
    player: PlayerModel | null = null;
    mobsService: MobsService | null = null;
    playersService: PlayersService | null = null;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any; }): void {
        this.i18n = i18n;
        this.player = player;
        this.mobsService = services.MobsService;
        this.playersService = services.PlayersService;
    }

    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n) {
                if (await commandOnlyForPrivate(message, this.i18n)) {
                    if (this.player) {
                        if (this.player.state != PlayerState.Idle) {
                            message.reply(this.i18n.commands.hunt.find.failedToSearch);
                            return;
                        }
                        const mobs = await this.mobsService!.getAllMobs();
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
                            this.player!.state = PlayerState.Hunting;
                            this.player!.huntAgainst = selectedMob;
                            await this.playersService!.savePlayer(this.player);
                            message.reply(this.i18n.commands.hunt.find.found(selectedMob));
                        }
                    } else {
                        message.reply(this.i18n.commands.commons.needToStart);
                    }
                }
            }
        } catch (err) {
            throw err;
        }
    }
}