export class ItemModel {
    public id: string;
    public name: string;
    public value: number;
    public dropChance: number;
    public amount: number;

    constructor(id: string, name: string, value: number, dropChance: number, amount: number) {
        this.id = id;
        this.value = value;
        this.name = name;
        this.dropChance = dropChance;
        this.amount = amount;
    }

    toObject(): object {
        const itemObj = {
            id: this.id,
            name: this.name,
            value: this.value,
            dropChance: this.dropChance,
            amount: this.amount,
        };

        return itemObj;
    }

    static fromData(data: FirebaseFirestore.DocumentData): ItemModel {
        return new ItemModel(data.id, data.name,
            data.value, data.dropChance, data.amount);
    }
}