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
            welcome: (name: string) => `🌍 Bem-vindo ao mundo de RPG Land, ${name}! Embarque em uma jornada épica, conquiste áreas desafiadoras e torne-se um aventureiro lendário. ⚔️🛡️`,
            error: '❌ Falha no início de sua jornada. ',
            playerAlreadyStarted: '❌ Ops! Parece que você já está em jogo.'
        },
        commons: {
            needToStart: '❌ Você precisa começar sua jornada primeiro'
        },
        hunt: {
            find: {
                found: (mob: MobModel) => `🏹 Você encontrou um ${mob.name} com ${mob.health} de saúde! Prepare-se para a batalha! 🏹`,
                failedToSearch: `⚠️ Você já está no modo de caça. Termine sua caçada atual antes de iniciar uma nova.`,
            },
            attack: {
                attacking: (mob: string, damage: number, remainingHealth: number) => `⚔️ Você atacou o *${mob}* e causou *${damage}*! ⚔️\n O *${mob}* tem *${remainingHealth}* ❤️ restante.`,
                attacked: (mob: string, damage: number, remainingHealth: number) => `🔥 O *${mob}* atacou você e causou *${damage}*! Você tem *${remainingHealth}* ❤️ restante.`,
                defeated: (mob: string) => `☠️ Você foi derrotado pelo *${mob}*! ☠️\nVocê perdeu um nível.`,
                mobDefeated: (mob: string, exp: number) => `💥 Você derrotou o *${mob}* e ganhou *${exp}* pontos de experiência!`,
                failedToAttack: `⚠️ No momento, você não está caçando nenhum mob. Use o comando *--hunt find* para começar a caçar.`,
            }
        }
    }
};
