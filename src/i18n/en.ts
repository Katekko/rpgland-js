import { ItemType } from "../core/enums/item_type.enum";
import { ItemModel } from "../core/models/item.model";
import { MobModel } from "../core/models/mob.model";
import { PlayerModel } from "../core/models/player.model";
import { CommandTranslations } from "./translation";

const commandChar = '--';

function _createProfileBox(profile: string): string {
    const width = 20; // Width of the box
    const horizontalLine = '─'.repeat(width); // Horizontal line for the box

    const boxTop = `╭${horizontalLine}╮\n`; // Top line of the box
    const boxBottom = `\n╰${horizontalLine}╯`; // Bottom line of the box

    const emptyLine = `${' '.repeat(width)}`; // Empty line with matching width

    return `${boxTop}${emptyLine}\n\t${profile}\n${emptyLine}${boxBottom}`;
}

export const translationEn: CommandTranslations = {
    commands: {
        help: {
            title: "🌍 *Welcome to the world of RPG Land!* 🌍\n```Embark on an epic journey, conquer challenging areas, and become a legendary adventurer.\nHere's how to play:```",
            start: "🎮 *START*   -> ```Begin your adventure in RPG Land! Use this command to initiate your journey and explore the vast world filled with challenges, treasures, and epic quests.```",
            hunt: `🏹 *HUNT*   -> \`\`\`Venture into the wilderness to hunt dangerous creatures and earn XP and coins.\n🕵️‍♂️ *${commandChar}hunt find*\n⚔️ \*${commandChar}hunt attack\*\`\`\` `,
            heal: "🩹 *HEAL*   -> ```Consume a life potion to restore your health points (HP)❤️ when it's low.```",
            shop: "🛍️ *SHOP*   -> ```Visit the marketplace to spend your hard-earned coins on various items, gear, and enhancements.```"
        },
        start: {
            welcome: (name: string) => `🌍 Welcome to the world of RPG Land, *${name}*! 🌍\nEmbark on an epic journey, conquer challenging areas, and become a legendary adventurer. ⚔️🛡️\n\n🕵️‍♂️ To find mobs, use the command: *${commandChar}hunt find*\n⚔️ To attack a mob, use the command: *${commandChar}hunt attack*`,
            error: '❌ Failed start your journey ',
            playerAlreadyStarted: '❌ Oops! Looks like you\'re already in the game.'
        },
        commons: {
            needToStart: `⚠️ You need to start you journey first\nType: *${commandChar}start*`,
            somethingWrong: '❌❌❌ Something is off, please call Katekko ❌❌❌'
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
                failedToAttack: `⚠️ You are not currently hunting any mob. Use the command *${commandChar}hunt find* to start hunting.`,
                levelUp: (level: number) => `🎉 Congratulations! 🎉\nYou have reached level *${level}*!`,
                itemFound: (item: ItemModel) => `🎉 You found ${item.amount} ${item.name}! 🎉`
            }
        },
        perfil: (player: PlayerModel) => {
            const progressBarLength = 10;
            const filledBarCount = Math.floor((player.exp / player.getExpNeededForNextLevel()) * progressBarLength);
            const emptyBarCount = progressBarLength - filledBarCount;

            const filledBar = '▓'.repeat(filledBarCount);
            const emptyBar = '░'.repeat(emptyBarCount);

            const coinItem = player.inventory.find(item => item.type === ItemType.Currency);
            return _createProfileBox(`\`\`\`${player.state.toString()}\`\`\`\n\t🧍 *${player.name}* > *Lv. ${player.level}*\n\t[${filledBar}${emptyBar}] (${player.exp}/${player.getExpNeededForNextLevel()})\n\n\t❤️ ${player.health}   ⚔️ *${player.getMaxAttack()}   💰 ${coinItem?.amount ?? 0}*`);
        },
        shop: {
            info: (items: ItemModel[]) => {
                const itemLines = items.map(item => `🛒 *${item.name}* - Price: *${item.price}* coins`);
                const itemsInfo = itemLines.join('\n');
                const drawContinuousLine = (length: number): string => {
                    return "\u2500".repeat(length);
                };

                const continuousLine = drawContinuousLine(20);
                return `🏪 Welcome to the Shop! 🛍️\n${continuousLine}\n${itemsInfo}\n${continuousLine}\nTo buy an item, use the command: *--shop buy <item name>*`;
            }
        }
    }
};
