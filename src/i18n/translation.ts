import { ItemModel } from "../core/models/item.model";
import { MobModel } from "../core/models/mob.model";
import { PlayerModel } from "../core/models/player.model";
import { translationEn } from "./en";
import { translationPtBR } from "./pt_br";

export type CommandTranslations = {
    getLocale: () => string;
    commands: {
        help: {
            title: string,
            start: string,
            hunt: string,
            heal: string,
            shop: string,
            profile: string,
            ranking: string,
            language: string,
        },
        start: {
            welcome: (name: string) => string,
            error: string,
            playerAlreadyStarted: string,
        },
        commons: {
            needToStart: string
            somethingWrong: string,
            waitMessage: string,
            notAuthorized: string,
            botMaintenance: string,
            commandOnlyForPrivate: string,
            youAreNotKatekko: string,
            commandNotFound: string,
        },
        hunt: {
            find: {
                found: (mob: MobModel) => string,
                failedToSearch: string,
            }
            attack: {
                attacking: (mob: string, damage: number, remainingHealth: number) => string,
                attacked: (mobName: string, damage: number, remainingHealth: number) => string,
                defeated: (mobName: string) => string,
                mobDefeated: (mobName: string, exp: number) => string,
                failedToAttack: string,
                levelUp: (level: number) => string,
                itemFound: (item: ItemModel) => string,
            }
        },
        profile: (player: PlayerModel) => string,
        shop: {
            info: (items: ItemModel[]) => string,
            itemNotFound: (itemName: string) => string,
            missingArguments: string,
            insufficientCoins: (itemName: string) => string,
            buy: (item: ItemModel, amount: number, totalPrice: number) => string,
            notIdle: string,
        },
        ranking: {
            leaderboard: (players: PlayerModel[]) => string,
        },
        heal: {
            healedWithItem: (healedAmount: number, currentHealth: number, itemName: string) => string,
            noPotion: string,
            failedToHeal: string
        },
        inventory: {
            emptyInventory: string,
            open: (player: PlayerModel) => string
        },
        language: {
            changed: (lang: string) => string,
            error: string,
        },
        migrate: {
            mobs: string,
            items: string,
            players: string,
            all: string,
            error: string,
        },
    };
};

export function i18n(number: string | null, language: string | void): CommandTranslations {
    if (language) {
        return language == 'pt_BR' ? translationPtBR : translationEn;
    } else {
        return number?.startsWith('55') ? translationPtBR : translationEn;
    }
}
