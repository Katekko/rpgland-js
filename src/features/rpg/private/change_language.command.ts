import { Message } from "whatsapp-web.js";
import { Command } from "../../../core/abstractions/command/command";
import { commandOnlyForPrivate } from "../../../core/middlewares/command_only_for_private.middleware";
import { ServiceFactory } from "../../../core/factories/service.factory";

export class ChangeLanguageCommand extends Command {
    async execute(message: Message, args: any): Promise<void> {
        if (await commandOnlyForPrivate(message)) {
            await super.execute(message, args);
            if (this.player) {
                const languages = ['pt_BR', 'en'];
                const language = args[0];
                if (language && languages.includes(language)) {
                    const playerService = ServiceFactory.makePlayersService();
                    this.player.language = language;
                    await playerService.savePlayer(this.player);
                    await super.execute(message, args);
                    message.reply(this.translate.commands.language.changed(language));
                } else {
                    message.reply(this.translate.commands.language.error);
                }
            }
        }
    }
}
