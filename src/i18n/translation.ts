import { translationEn } from "./en";

export type CommandTranslations = {
    commands: {
        help: {
            title: string,
            start: string,
            hunt: string,
            heal: string,
            shop: string
        };
    };
};

export function i18n(): CommandTranslations {
    // based in a variable somewhere will decide if will be english or portugues (or something else)
    // <default english>
    return translationEn;
}