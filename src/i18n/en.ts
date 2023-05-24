import { CommandTranslations } from "./translation";

export const translationEn: CommandTranslations = {
    commands: {
        help: {
            title: "🌍 *Welcome to the world of RPG Land!* 🌍\n```Embark on an epic journey, conquer challenging areas, and become a legendary adventurer.\nHere's how to play:```",
            start: "🎮 *START*   -> ```Begin your adventure in RPG Land! Use this command to initiate your journey and explore the vast world filled with challenges, treasures, and epic quests.```",
            hunt: "🏹 *HUNT*   -> ```Venture into the wilderness to hunt dangerous creatures and earn XP and coins.```",
            heal: "🩹 *HEAL*   -> ```Consume a life potion to restore your health points (HP) when it's low.```",
            shop: "🛍️ *SHOP*   -> ```Visit the marketplace to spend your hard-earned coins on various items, gear, and enhancements.```"
        },
        start: {
            welcome: (name: string) => `🌍 Welcome to the world of RPG Land, *${name}*!\nEmbark on an epic journey, conquer challenging areas, and become a legendary adventurer. ⚔️🛡️`,
            error: '❌ Failed start your journey ',
            playerAlreadyStarted: '❌ Oops! Looks like you\'re already in the game.'
        }
    }
};
