import { Command } from "../../../../core/abstractions/command/command";
import { commandOnlyForPrivate } from "../../../../core/middlewares/command_only_for_private.middleware";
import { PlayerModel } from "../../../../core/models/player.model";
import { CustomMessage } from "../../../../handle_messages";
import { CommandTranslations } from "../../../../i18n/translation";
import { ItemsService } from "../../../../services/items.service";
import { MobsService } from "../../../../services/mobs.service";
import { PlayersService } from "../../../../services/players.service";

export class MigrateItemsCommand extends Command {
    playersService: PlayersService | null = null;
    itemsService: ItemsService | null = null;
    mobsService: MobsService | null = null;

    injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any; }): void {
        this.i18n = i18n;
        this.playersService = services.PlayersService;
        this.itemsService = services.ItemsService;
        this.mobsService = services.MobsService;
    }


    async execute(message: CustomMessage, args: any): Promise<void> {
        try {
            if (this.i18n) {
                try {
                    await this.itemsService!.migrate();
                    await this.mobsService!.migrate();
                    await this.playersService!.migrate();

                    message.reply(this.i18n.commands.migrate.all);
                } catch (err) {
                    message.reply(this.i18n.commands.migrate.error);
                    throw err;
                }
            }
        } catch (err) {
            throw err;
        }
    }
}
