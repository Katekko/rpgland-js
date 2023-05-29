import { ItemModel } from "../models/item.model";
import { MobModel } from "../models/mob.model";
import { ItemFactory } from "./item.factory";

export class MobFactory {
    static makeSlime(): MobModel {
        return new MobModel(
            '6df300e0-4fec-4691-861f-cc4b237fc575',
            'Slime',
            1, 2,
            [
                ItemFactory.makeCoin(),
                ItemFactory.makeHealthPotion()
            ],
            4, .5, 1,
        );
    }

    static makeGoblin(): MobModel {
        return new MobModel(
            '36e35b45-bae2-4f25-91a3-64fd1087e1ec',
            'Goblin',
            3, 5,
            [
                ItemFactory.makeCoin(),
                ItemFactory.makeHealthPotion()
            ],
            8, .40, 4,
        );
    }

    static makeWolf(): MobModel {
        return new MobModel(
            'ae6de135-37e1-4a6d-bf1f-1e5aecc8c491',
            'Wolf',
            5, 30,
            [
                ItemFactory.makeCoin(),
                ItemFactory.makeHealthPotion(),
                ItemFactory.makeSillySword(),
            ],
            20, .10, 10,
        );
    }


    static getAllMobsForMigration(): MobModel[] {
        return [
            MobFactory.makeSlime(),
            MobFactory.makeGoblin(),
            MobFactory.makeWolf(),
        ];;
    }
} 