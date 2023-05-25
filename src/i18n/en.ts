import { MobModel } from "../core/models/mob.model";
import { CommandTranslations } from "./translation";

export const translationEn: CommandTranslations = {
    commands: {
        help: {
            title: "🌍 *Welcome to the world of RPG Land!* 🌍\n```Embark on an epic journey, conquer challenging areas, and become a legendary adventurer.\nHere's how to play:```",
            start: "🎮 *START*   -> ```Begin your adventure in RPG Land! Use this command to initiate your journey and explore the vast world filled with challenges, treasures, and epic quests.```",
            hunt: "🏹 *HUNT*   -> ```Venture into the wilderness to hunt dangerous creatures and earn XP and coins.\n🕵️‍♂️ *-hunt find*\n⚔️ \*-hunt attack\*```",
            heal: "🩹 *HEAL*   -> ```Consume a life potion to restore your health points (HP)❤️ when it's low.```",
            shop: "🛍️ *SHOP*   -> ```Visit the marketplace to spend your hard-earned coins on various items, gear, and enhancements.```"
        },
        start: {
            welcome: (name: string) => `🌍 Welcome to the world of RPG Land, *${name}*! 🌍\nEmbark on an epic journey, conquer challenging areas, and become a legendary adventurer. ⚔️🛡️\n\n🕵️‍♂️ To find mobs, use the command: *-hunt find*\n⚔️ To attack a mob, use the command: *-hunt attack*`,
            error: '❌ Failed start your journey ',
            playerAlreadyStarted: '❌ Oops! Looks like you\'re already in the game.'
        },
        commons: {
            needToStart: '❌ You need to start you journey first'
        },
        hunt: {
            find: {
                found: (mob: MobModel) => `🏹 Get ready to battle! 🏹\nYou found a *${mob.name}* with *${mob.health}*❤️ health!`,
                failedToSearch: `⚠️ You are already in hunting mode. Finish your current hunt before starting a new one.`,
            },
            attack: {
                attacking: (mob: string, damage: number, remainingHealth: number) => `⚔️ You attacked the *${mob}* and dealt *${damage}* damage! ⚔️\nThe *${mob}* has *${remainingHealth}* ❤️ remaining.`,
                attacked: (mob: string, damage: number, remainingHealth: number) => `🔥 The *${mob}* attacked you and dealt *${damage}* damage! 🔥\nYou have *${remainingHealth}* ❤️ remaining.`,
                defeated: (mob: string) => `☠️ You were defeated by the *${mob}*! ☠️\nYou have lost one level.`,
                mobDefeated: (mob: string, exp: number) => `💥 You have defeated the *${mob}* and earned *${exp}* experience points!`,
                failedToAttack: `⚠️ You are not currently hunting any mob. Use the command *-hunt find* to start hunting.`,
            }
        }
    }
};
