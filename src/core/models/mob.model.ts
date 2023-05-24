import { ItemModel } from "./item.model";

export class MobModel {
    public id: string;
    public name: string;
    public level: number;
    public expDrop: number;
    public itemsDrop: ItemModel[];
    public health: number;

    constructor(id: string, name: string, level: number, expDrop: number, itemsDrop: ItemModel[], health: number) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.expDrop = expDrop;
        this.itemsDrop = itemsDrop;
        this.health = health;
    }

    toObject(): object {
        const mobObj = {
            id: this.id,
            name: this.name,
            level: this.level,
            exp: this.expDrop,
            itemsDrop: this.itemsDrop,
            health: this.health,
        };

        return mobObj;
    }
}