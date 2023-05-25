import { CommandMap } from './core/command';
import { PingCommand } from './features/common/private/ping.command';
import { HelpCommand } from './features/rpg/both/help.command';
import { PerfilCommand } from './features/rpg/both/perfil.command';
import { RankingCommand } from './features/rpg/both/ranking.command';
import { HealCommand } from './features/rpg/private/heal.command';
import { HuntCommand } from './features/rpg/private/hunt/hunt.command';
import { HuntAttackCommand } from './features/rpg/private/hunt/hunt_attack.command';
import { ShopCommand } from './features/rpg/private/shop/shop.command';
import { ShopBuyCommand } from './features/rpg/private/shop/shop_buy.command';
import { StartCommand } from './features/rpg/private/start.command';

/** All existent commands in the bot */
export const commands: CommandMap = {
    ping: new PingCommand(),
    help: new HelpCommand(),
    start: new StartCommand(),
    perfil: new PerfilCommand(),
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
};
