import { ItemModel } from "./item.model";

export class MobModel {
    public id: string;
    public name: string;
    public level: number;
    public expDrop: number;
    public itemsDrop: ItemModel[];
    public health: number;
    public chanceToAppear: number;
    public attack: number;

    constructor(id: string, name: string, level: number, expDrop: number,
        itemsDrop: ItemModel[], health: number, chanceToAppear: number,
        attack: number) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.expDrop = expDrop;
        this.itemsDrop = itemsDrop;
        this.health = health;
        this.chanceToAppear = chanceToAppear;
        this.attack = attack;
    }

    toObject(): object {
        const mobObj = {
            id: this.id,
            name: this.name,
            level: this.level,
            expDrop: this.expDrop,
            itemsDrop: this.itemsDrop.map((e) => e.toObject()),
            health: this.health,
            chanceToAppear: this.chanceToAppear,
            attack: this.attack,
        };

        return mobObj;
    }

    static fromData(data: FirebaseFirestore.DocumentData | null): MobModel | null {
        if (data == null) return null;

        const model = new MobModel(
            data.id,
            data.name,
            data.level,
            data.expDrop,
            data.itemsDrop.map((e: any) => ItemModel.fromData(e)),
            data.health,
            data.chanceToAppear,
            data.attack,
        );
        return model;
    }
}