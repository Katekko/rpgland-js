import { CustomMessage } from "../../handle_messages";
import { CommandTranslations } from "../../i18n/translation";

export async function commandOnlyForPrivate(message: CustomMessage, i18n: CommandTranslations): Promise<boolean> {
    if (message.isGroup) {
        message.reply(i18n.commands.commons.commandOnlyForPrivate);
        return false;
    }

    return true;
}