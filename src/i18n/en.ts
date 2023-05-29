import { ItemType } from "../core/enums/item_type.enum";
import { ItemModel } from "../core/models/item.model";
import { MobModel } from "../core/models/mob.model";
import { PlayerModel } from "../core/models/player.model";
import { CommandTranslations } from "./translation";

export class TranslationEn extends CommandTranslations {
    constructor(public commandChar: string) {
        super();
    }

    getLocale(): string { return 'en' };

    private _createProfileBox(profile: string): string {
        const width = 20;
        const horizontalLine = '─'.repeat(width);
        const boxTop = `╭${horizontalLine}╮\n`;
        const boxBottom = `\n╰${horizontalLine}╯`;
        const emptyLine = `${' '.repeat(width)}`;
        return `${boxTop}${emptyLine}\n\t${profile}\n${emptyLine}${boxBottom}`;
    }

    commands = {
        help: {
            title:
                "🌍 *Welcome to the world of RPG Land!* 🌍\n```Embark on an epic journey, conquer challenging areas, and become a legendary adventurer.\nHere's how to play:```",
            start: `🎮 *START*   -> \`\`\`Begin your adventure in RPG Land! Use this command to initiate your journey and explore the vast world filled with challenges, treasures, and epic quests.\n🌟 \*${this.commandChar}start\*\`\`\``,
            hunt: `🏹 *HUNT*   -> \`\`\`Venture into the wilderness to hunt dangerous creatures and earn XP and coins.\n🕵️‍♂️ \*${this.commandChar}hunt find\*\n⚔️ \*${this.commandChar}hunt attack\*\`\`\``,
            heal: `🩹 *HEAL*   -> \`\`\`Consume a life potion to restore your health points (HP)❤️ when it's low.\n🍷 *${this.commandChar}heal <amount | 1>*\`\`\``,
            shop: `🛍️ *SHOP*   -> \`\`\`Visit the marketplace to spend your hard-earned coins on various items, gear, and enhancements.\n🛒 *${this.commandChar}shop info*\n💰 \*${this.commandChar}shop buy <item name> <amount>\*\`\`\``,
            profile: `🧍 *PROFILE*   -> \`\`\`Check your player profile and stats.\n📊 \*${this.commandChar}profile\*\`\`\``,
            ranking: `🏆 *RANKING*   -> \`\`\`Check the leaderboard to see the top players by level.\n👑 \*${this.commandChar}ranking\*\`\`\``,
            language:
                '🌐 To change the language of the bot, use the *language* command with the desired language code.\n\nExample: `--language pt_BR` or `--language en`.',
        },
        start: {
            welcome: (name: string) =>
                `🌍 Welcome to the world of RPG Land, *${name}*! 🌍\nEmbark on an epic journey, conquer challenging areas, and become a legendary adventurer. ⚔️🛡️\n\n🕵️‍♂️ To find mobs, use the command: *${this.commandChar}hunt find*\n⚔️ To attack a mob, use the command: *${this.commandChar}hunt attack*`,
            error: "❌ Failed start your journey ",
            playerAlreadyStarted: "❌ Oops! Looks like you're already in the game.",
        },
        commons: {
            needToStart: `⚠️ You need to start your journey first\nType: *${this.commandChar}start*`,
            somethingWrong: "❌❌❌ Something is off, please call Katekko ❌❌❌",
            waitMessage: "⏳ Please wait a moment before sending another message.",
            notAuthorized:
                "❌ You are not authorized to use this bot. ❌\nPlease contact the administrator for access.\n*Katekko#1429* ",
            botMaintenance:
                "*🛠️ The bot is currently undergoing maintenance. 🛠️\nPlease try again later.*",
            commandOnlyForPrivate: "❌ This command can only be used in private chats. ❌",
            youAreNotKatekko: "❌ You are not Katekko, you little bastard. ❌",
            commandNotFound: "❌ Command not found",
        },
        hunt: {
            find: {
                found: (mob: MobModel) =>
                    `🏹 Get ready to battle! 🏹\nYou found a *${mob.name}* with *${mob.health}*❤️ health!`,
                failedToSearch: `⚠️ You are already in hunting mode. Finish your current hunt before starting a new one.`,
            },
            attack: {
                attacking: (mob: string, damage: number, remainingHealth: number) =>
                    `⚔️ You attacked the *${mob}* and dealt *${damage}* damage! ⚔️\nThe *${mob}* has *${remainingHealth}* ❤️ remaining.`,
                attacked: (mob: string, damage: number, remainingHealth: number) =>
                    `🔥 The *${mob}* attacked you and dealt *${damage}* damage! 🔥\nYou have *${remainingHealth}* ❤️ remaining.`,
                defeated: (mob: string) =>
                    `☠️ You were defeated by the *${mob}*! ☠️\nYou have lost one level.`,
                mobDefeated: (mob: string, exp: number) =>
                    `💥 You have defeated the *${mob}* and earned *${exp}* experience points!`,
                failedToAttack: `⚠️ You are not currently hunting any mob. Use the command *${this.commandChar}hunt find* to start hunting.`,
                levelUp: (level: number) =>
                    `🎉 Congratulations! 🎉\nYou have reached level *${level}*!`,
                itemFound: (item: ItemModel) =>
                    `🎉 You found ${item.amount} ${item.name}! 🎉`,
            },
        },
        profile: (player: PlayerModel) => {
            const progressBarLength = 10;
            const filledBarCount = Math.floor(
                (player.exp / player.getExpNeededForNextLevel()) * progressBarLength
            );
            const emptyBarCount = progressBarLength - filledBarCount;

            const filledBar = "▓".repeat(filledBarCount);
            const emptyBar = "░".repeat(emptyBarCount);

            const coinItem = player.inventory.find(
                (item) => item.type === ItemType.Currency
            );

            const potionCount = player.inventory.reduce((total, item) => {
                if (item.type === ItemType.HealthPotion) {
                    return total + item.amount;
                }
                return total;
            }, 0);
            return this._createProfileBox(
                `\`\`\`${player.state.toString()}\`\`\`\n\t🧍 *${player.name
                }* > *Lv. ${player.level}*\n\t[${filledBar}${emptyBar}] (${player.exp
                }/${player.getExpNeededForNextLevel()})\n\n\t❤️ ${player.health
                }/${player.getMaxHealth()}   ⚔️ *${player.getMaxAttack()}   💰 ${coinItem?.amount ?? 0
                }   🍷 ${potionCount}*`
            );
        },
        shop: {
            info: (items: ItemModel[]) => {
                const itemLines = items.map(
                    (item) => `🛒 *${item.name}* - Price: *${item.price}* coins`
                );
                const itemsInfo = itemLines.join("\n");
                const drawContinuousLine = (length: number): string => {
                    return "\u2500".repeat(length);
                };

                const continuousLine = drawContinuousLine(20);
                return `🏪 Welcome to the Shop! 🛍️\n${continuousLine}\n${itemsInfo}\n${continuousLine}\nTo buy an item, use the command: *--shop buy <item name> <amount>*`;
            },
            itemNotFound: (itemName: string) => {
                return `⚠️ The item *'${itemName}'* is not available in the shop.\nPlease check the item name and try again.`;
            },
            missingArguments: `⚠️ You need to provide the item name and the amount you want to buy.\nUsage: *--shop buy <item name> <amount>*`,
            insufficientCoins: (itemName: string) =>
                `⚠️ You don't have enough coins to purchase *${itemName}*.`,
            buy: (item: ItemModel, amount: number, totalPrice: number) => {
                return `✅ You have successfully purchased 🛒*${amount} ${item.name}* for 💰*${totalPrice}* coins!\nEnjoy your new item! 🎉`;
            },
            notIdle:
                "⚠️ You cannot access the shop while you are engaged in another activity.\nPlease finish your current task before visiting the shop.",
        },
        ranking: {
            leaderboard: (players: PlayerModel[]) => {
                const emojiPositions = ["🥇", "🥈", "🥉"];
                let leaderboardMessage = "🏆 Leaderboard - Top Players by Level 🏆\n\n";
                for (let i = 0; i < Math.min(players.length, 10); i++) {
                    const player = players[i];
                    const positionEmoji = i < 3 ? emojiPositions[i] : `#${i + 1}`;
                    leaderboardMessage += `${positionEmoji} ${player.name} - Level ${player.level}\n`;
                }
                return leaderboardMessage;
            },
        },
        heal: {
            healedWithItem: (healedAmount: number, currentHealth: number, itemName: string) => {
                return `🩹 You have been healed by *${healedAmount} HP* using a ${itemName}! 🎉\nYour current health is ❤️*${currentHealth} HP*.`;
            },
            noPotion:
                "😰 You don't have any *health potions left*. Visit the shop or continue hunting to obtain more.",
            failedToHeal:
                "⚠️ You are currently busy and cannot heal at the moment. Finish your current activity and try again.",
        },
        inventory: {
            emptyInventory: "🎒 Inventory 🎒\n\n📦 Your inventory is empty.",
            open: (player: PlayerModel) => {
                let inventoryMessage = "🎒 Inventory 🎒\n";
                const drawContinuousLine = (length: number): string => {
                    return "\u2500".repeat(length);
                };

                const continuousLine = drawContinuousLine(20);

                inventoryMessage += `${continuousLine}\n`;

                for (let i = 0; i < player.inventory.length; i++) {
                    const item = player.inventory[i];
                    inventoryMessage += `${i + 1}. ${item.name} - Amount: ${item.amount}\n`;
                }

                inventoryMessage += `${continuousLine}`;

                return inventoryMessage;
            },
        },
        language: {
            changed: (lang: string) =>
                `✅ Language changed successfully to *${lang}*`,
            error:
                "❌ Error occurred while changing the language. ❌\nChoose between these two options: 🇧🇷 *pt_BR* or 🇺🇸 *en*.",
        },
        migrate: {
            all: "✅ Migration completed for *all data*.",
            mobs: "✅ Mob migration completed.",
            players: "✅ Player migration completed.",
            items: "✅ Item migration completed.",
            error: "❌ An *error* occurred during migration.",
        },
    };
}
