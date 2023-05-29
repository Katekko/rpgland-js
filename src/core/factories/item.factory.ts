import { ItemType } from "../enums/item_type.enum";
import { ItemModel } from "../models/item.model";

export class ItemFactory {
    static makeCoin(): ItemModel {
        return new ItemModel({
            id: '7c0cd60e-0fc2-4dc7-88bf-bacbfbbbd6e1', name: 'Coin',
            amount: 5, dropChance: 0.65, price: 1, type: ItemType.Currency, value: 1,
            equipped: false
        });
    }

    static makeHealthPotion(): ItemModel {
        return new ItemModel({
            id: '872bad70-f696-4de5-a552-c16f132cb4d3', name: 'Health Potion',
            amount: 1, dropChance: 0.2, price: 2, type: ItemType.HealthPotion, value: 5,
            equipped: false
        });
    }

    static makeSillySword(): ItemModel {
        return new ItemModel({
            id: '4a05aa59-afad-4dd1-ae36-734a6b24a0b9', name: 'Silly Sword',
            amount: 0, dropChance: 0.1, price: 20, type: ItemType.Weapon, value: 5,
            equipped: false
        });
    }

    static makeItemByName(name: string): ItemModel {
        switch (name) {
            case this.makeCoin().name:
                return this.makeCoin();
            case this.makeHealthPotion().name:
                return this.makeHealthPotion();
            case this.makeSillySword().name:
                return this.makeSillySword();
            default:
                throw Error('Invalid item name');
        }
    }

    static makeItemsToShop(): ItemModel[] {
        return [this.makeHealthPotion(), this.makeSillySword()];
    }

    static getAllItemsForMigration(): ItemModel[] {
        return [
            this.makeCoin(),
            this.makeHealthPotion(),
            this.makeSillySword()
        ];;
    }
} 