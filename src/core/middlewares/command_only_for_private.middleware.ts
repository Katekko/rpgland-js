import { Message } from "whatsapp-web.js";
import { i18n } from "../../i18n/translation";

export async function commandOnlyForPrivate(message: Message): Promise<boolean> {
    if ((await message.getChat()).isGroup) {
        const translate = i18n((await message.getContact()).number);
        message.reply(translate.commands.commons.commandOnlyForPrivate);
        return false;
    }

    return true;
}