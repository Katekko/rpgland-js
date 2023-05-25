import { ItemType } from "../enums/item_type.enum";
import { ItemModel } from "../models/item.model";

export class ItemFactory {
    private itemsList: ItemModel[] = [
        ItemFactory.makeCoin(),
    ];

    static makeCoin(): ItemModel {
        return new ItemModel('7c0cd60e-0fc2-4dc7-88bf-bacbfbbbd6e1', 'Coin', 1, 0.5, 5, ItemType.Currency);
    }

    static makeItemByType(type: ItemType): ItemModel {
        switch (type) {
            case ItemType.Currency:
                return this.makeCoin();
            default:
                throw Error('Invalid item type');
        }
    }
} 