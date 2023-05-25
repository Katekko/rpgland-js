import { PlayerState } from "../enums/player_state.enum";
import { ItemModel } from "./item.model";
import { MobModel } from "./mob.model";
import { v4 as uuidv4 } from 'uuid';

export class PlayerModel {
    public id: string;
    public name: string;
    public level: number;
    public exp: number;
    public telephoneNumber: string;
    public health: number;

    public state: PlayerState;

    public huntAgainst: MobModel | null;
    public baseAttack: number;

    private baseExp = 100;
    private expMultiplier = 1.5;

    public inventory: ItemModel[];

    getMaxHealth(): number {
        return this._getBaseHealth();
    }

    // Max range of your attack
    getMaxAttack(): number {
        return this.baseAttack * this.level;
    }

    // Random attack to attack the mob
    getRandomAttack(): number {
        const playerAttack = this.getMaxAttack();
        const randomDamage = Math.random() * (playerAttack - 1) + 1;
        const roundedDamage = Math.round(randomDamage);
        return roundedDamage;
    }

    // Base health of the player
    private _getBaseHealth(): number {
        //modificadores de gear
        return 40;
    }

    private _getBaseAttack(): number {
        // modificadores de gear
        return 5;
    }

    setPlayerDeath() {
        this.state = PlayerState.Idle;
        this.huntAgainst = null;
        this.level -= this.level == 1 ? 0 : 1;
        this.health = this._getBaseHealth();
        this.exp = 0;
    }

    getExpNeededForNextLevel(): number {
        return Math.floor(this.baseExp * Math.pow(this.expMultiplier, this.level - 1));
    }

    constructor(id: string, name: string, telephoneNumber: string,
        level: number | null, exp: number | null,
        health: number | null, state: PlayerState | null,
        huntAgainst: MobModel | null, baseAttack: number | null, inventory: ItemModel[] | null) {
        this.id = id;
        this.name = name;
        this.level = level ?? 1;
        this.exp = exp ?? 0;
        this.telephoneNumber = telephoneNumber;
        this.health = health ?? this._getBaseHealth();
        this.state = state ?? PlayerState.Idle;
        this.huntAgainst = huntAgainst;
        this.baseAttack = baseAttack ?? this._getBaseAttack();
        this.inventory = inventory ?? [];
    }

    static createNew(name: string, telephone: string): PlayerModel {
        const player = new PlayerModel(uuidv4(), name, telephone,
            null, null, null, null, null, null, null);
        return player;
    }

    toObject(): object {
        const playerDataObj = {
            id: this.id,
            name: this.name,
            level: this.level,
            exp: this.exp,
            telephoneNumber: this.telephoneNumber,
            health: this.health,
            state: this.state,
            huntAgainst: this.huntAgainst?.toObject() ?? null,
            maxAttack: this.baseAttack,
            inventory: this.inventory.map((e) => e.toObject()),
        };

        return playerDataObj;
    }

    static fromData(data: FirebaseFirestore.DocumentData): PlayerModel {
        const model = new PlayerModel(
            data.id, data.name, data.telephoneNumber,
            data.level, data.exp, data.health, data.state,
            MobModel.fromData(data.huntAgainst),
            data.maxAttack,
            data.inventory.map((e: any) => ItemModel.fromData(e)),
        );

        return model;
    }
}