import { MobModel } from "../core/models/mob.model";
import { CommandTranslations } from "./translation";

export const translationPtBR: CommandTranslations = {
    "commands": {
        help: {
            title: "Bem-vindo ao mundo de RPG Land! Embarque em uma jornada épica, conquiste áreas desafiadoras e torne-se um aventureiro lendário. Veja como jogar:",
            start: "🎮 *start*: Begin your adventure in RPG Land! Use this command to initiate your journey and explore the vast world filled with challenges, treasures, and epic quests.",
            hunt: "Aventure-se pela natureza para caçar criaturas perigosas e ganhar XP e moedas.",
            heal: "Consuma uma poção de vida para restaurar seus pontos de vida (HP) quando estiverem baixos.",
            shop: "Visite o mercado para gastar suas moedas suadas em vários itens, equipamentos e melhorias."
        },
        start: {
            welcome: (name: string) => `🌍 Welcome to the world of RPG Land, ${name}! Embark on an epic journey, conquer challenging areas, and become a legendary adventurer. ⚔️🛡️`,
            error: '❌ Failed start your journey ',
            playerAlreadyStarted: '❌ Oops! Looks like you\'re already in the game.'
        },
        commons: {
            needToStart: '❌ You need to start you journey first'
        },
        hunt: {
            find: {
                found: (mob: MobModel) => `🏹 You found a ${mob.name} with ${mob.health} health! Get ready to battle! 🏹`,
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
