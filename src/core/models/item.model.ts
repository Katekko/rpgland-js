export class ItemModel {
    public id: string;
    public name: string;
    public value: number;

    constructor(id: string, name: string,value: number) {
        this.id = id;
        this.value = value;
        this.name = name;
    }

    toObject(): object {
        const itemObj = {
            id: this.id,
            name: this.name,
            value: this.value,
        };

        return itemObj;
    }
}