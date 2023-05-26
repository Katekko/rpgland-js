import { CommandMap } from './core/abstractions/command/command';
import { PingCommand } from './features/common/private/ping.command';
import { HelpCommand } from './features/rpg/both/help.command';
import { ProfileCommand } from './features/rpg/both/profile.command';
import { RankingCommand } from './features/rpg/both/ranking.command';
import { HealCommand } from './features/rpg/private/heal.command';
import { HuntCommand } from './features/rpg/private/hunt/hunt.command';
import { HuntAttackCommand } from './features/rpg/private/hunt/hunt_attack.command';
import { InventoryCommand } from './features/rpg/private/inventory.command';
import { ShopCommand } from './features/rpg/private/shop/shop.command';
import { ShopBuyCommand } from './features/rpg/private/shop/shop_buy.command';
import { StartCommand } from './features/rpg/private/start.command';

/** All existent commands in the bot */
export const commands: CommandMap = {
    ping: new PingCommand(),
    help: new HelpCommand(),
    start: new StartCommand(),
    profile: new ProfileCommand(),
    hunt: {
        find: new HuntCommand(),
        attack: new HuntAttackCommand(),
    },
    shop: {
        info: new ShopCommand(),
        buy: new ShopBuyCommand(),
    },
    ranking: new RankingCommand(),
    heal: new HealCommand(),
    inventory: new InventoryCommand(),
};
