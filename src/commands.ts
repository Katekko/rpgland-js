import { Command, CommandMap } from './core/abstractions/command/command';
import { PingCommand } from './features/common/private/ping.command';
import { HelpCommand } from './features/rpg/both/help.command';
import { ProfileCommand } from './features/rpg/both/profile.command';
import { RankingCommand } from './features/rpg/both/ranking.command';
import { AddWhitelistCommand } from './features/rpg/private/admin/add_whitelist.command';
import { ChangeLanguageCommand } from './features/rpg/private/change_language.command';
import { HealCommand } from './features/rpg/private/heal.command';
import { HuntCommand } from './features/rpg/private/hunt/hunt.command';
import { HuntAttackCommand } from './features/rpg/private/hunt/hunt_attack.command';
import { InventoryCommand } from './features/rpg/private/inventory.command';
import { MigrateItemsCommand } from './features/rpg/private/migrate/migrate_items.command';
import { MigrateMobsCommand } from './features/rpg/private/migrate/migrate_mobs.command';
import { MigratePlayersCommand } from './features/rpg/private/migrate/migrate_players.command';
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
    admin: {
        add: {
            whitelist: new AddWhitelistCommand()
        },
        migrate: {
            mobs: new MigrateMobsCommand(),
            items: new MigrateItemsCommand(),
            players: new MigratePlayersCommand(),
        }
    },
    language: new ChangeLanguageCommand(),
};

type PrivateCommandTypes = typeof Command[];

export const privateCommands: PrivateCommandTypes = [
    StartCommand, HuntCommand, HuntAttackCommand,
    ShopCommand, ShopBuyCommand, HealCommand,
    InventoryCommand, MigrateMobsCommand, MigrateItemsCommand,
    MigratePlayersCommand,
];