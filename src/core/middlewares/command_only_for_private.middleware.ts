import { Message } from "whatsapp-web.js";
import { CommandTranslations, i18n } from "../../i18n/translation";
import { ServiceFactory } from "../factories/service.factory";

export async function commandOnlyForPrivate(message: Message): Promise<boolean> {
    if ((await message.getChat()).isGroup) {
        const playersService = ServiceFactory.makePlayersService();
        const player = await playersService.getPlayerByMessage(message);
        let translate: CommandTranslations;
        if (player) {
            translate = i18n(player.language);
        } else {
            translate = i18n((await message.getContact()).number);
        }

        message.reply(translate.commands.commons.commandOnlyForPrivate);
        return false;
    }

    return true;
}