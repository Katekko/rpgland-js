import { DataModel } from "../abstractions/models/data_model";
import { Data } from "../abstractions/service/store";
import { ItemType } from "../enums/item_type.enum";

/**
 * Represents an item in the game.
 */
export class ItemModel extends DataModel {
    /**
     * The name of the item.
     */
    public name: string;

    /**
     * The value of the item.
     */
    public value: number;

    /**
    The drop chance of the item.
    This property represents the probability of the item dropping when obtained from a mob.
    The drop chance is calculated based on various factors, such as the mob's drop rate, player's luck, and other game mechanics.
    The drop chance is expressed as a decimal number ranging from 0 to 1, where 0 represents no chance of dropping and 1 represents a guaranteed drop.
    The actual drop rate may vary depending on the specific implementation of the game logic.
    */
    public dropChance: number;

    /**
     * The amount of the item.
     * 0 means will drop only one per drop
     */
    public amount: number;

    /**
     * The type of the item.
     */
    public type: ItemType;

    /**
     * The price of the item in shop.
     */
    public price: number;

    /**
     * If the item is equiped 
     */
    public equipped: boolean;

    /**
     * Constructs a new instance of the ItemModel class.
     * @param id - The ID of the item.
     * @param name - The name of the item.
     * @param value - The value of the item.
     * @param dropChance - The drop chance of the item.
     * @param amount - The amount of the item.
     * @param type - The type of the item.
     * @param price - The price of the item.
     */
    constructor({
        id,
        name,
        value,
        dropChance,
        amount,
        type,
        price,
        equipped,
    }: {
        id: string;
        name: string;
        value: number;
        dropChance: number;
        amount: number;
        type: ItemType;
        price: number;
        equipped: boolean;
    }) {
        super(id);
        this.value = value;
        this.name = name;
        this.dropChance = dropChance;
        this.amount = amount;
        this.type = type;
        this.price = price;
        this.equipped = equipped;
    }

    /**
     * Converts the ItemModel instance to a plain JavaScript object.
     * @returns The plain JavaScript object representing the item.
     */
    toObject(): object {
        const itemObj = {
            id: this.id,
            name: this.name,
            value: this.value,
            dropChance: this.dropChance,
            amount: this.amount,
            type: this.type,
            price: this.price,
            equipped: this.equipped,
        };

        return itemObj;
    }

    /**
     * Creates a new ItemModel instance from the provided data object.
     * @param data - The data object representing the item.
     * @returns A new instance of ItemModel.
     */
    static fromData(data: Data): ItemModel {
        return new ItemModel({
            id: data.id,
            amount: data.amount,
            dropChance: data.dropChance,
            name: data.name,
            price: data.price,
            type: data.type,
            value: data.value,
            equipped: data.equipped ?? false,
        });
    }
}