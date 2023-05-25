import { ItemType } from "../enums/item_type.enum";

export class ItemModel {
    public id: string;
    public name: string;
    public value: number;
    public dropChance: number;
    public amount: number;
    public type: ItemType;

    constructor(id: string, name: string, value: number, dropChance: number, amount: number, type: ItemType) {
        this.id = id;
        this.value = value;
        this.name = name;
        this.dropChance = dropChance;
        this.amount = amount;
        this.type = type;
    }

    toObject(): object {
        const itemObj = {
            id: this.id,
            name: this.name,
            value: this.value,
            dropChance: this.dropChance,
            amount: this.amount,
            type: this.type,
        };

        return itemObj;
    }

    static fromData(data: FirebaseFirestore.DocumentData): ItemModel {
        return new ItemModel(data.id, data.name,
            data.value, data.dropChance, data.amount, data.type);
    }
}