import { CustomMessage } from "../../../handle_messages";
import { CommandTranslations } from "../../../i18n/translation";
import { PlayerModel } from "../../models/player.model";

export type CommandMap = {
    [key: string]: Command | CommandMap;
};

export abstract class Command {
    public i18n: CommandTranslations | undefined

    abstract execute(message: CustomMessage, args: any): Promise<void>;
    abstract injectDependencies(i18n: CommandTranslations, player: PlayerModel | null, services: { [key: string]: any }): void;
}

export abstract class CommandGuard extends Command {

}