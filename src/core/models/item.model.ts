import { DataModel } from "../abstractions/models/data_model";
import { Data } from "../abstractions/service/store";
import { ItemType } from "../enums/item_type.enum";

export class ItemModel extends DataModel {
    public name: string;
    public value: number;
    public dropChance: number;
    public amount: number;
    public type: ItemType;
    public price: number;

    constructor(id: string, name: string, value: number, dropChance: number, amount: number, type: ItemType, price: number) {
        super(id);
        this.value = value;
        this.name = name;
        this.dropChance = dropChance;
        this.amount = amount;
        this.type = type;
        this.price = price;
    }

    toObject(): object {
        const itemObj = {
            id: this.id,
            name: this.name,
            value: this.value,
            dropChance: this.dropChance,
            amount: this.amount,
            type: this.type,
            price: this.price,
        };

        return itemObj;
    }

    static fromData(data: Data): ItemModel {
        return new ItemModel(data.id, data.name,
            data.value, data.dropChance, data.amount, data.type,
            data.price);
    }
}