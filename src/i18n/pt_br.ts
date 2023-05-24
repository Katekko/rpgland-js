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
        }
    }
};
