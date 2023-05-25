import { PlayerState } from "../enums/player_state.enum";
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
    private maxAttack: number;

    getRealAttack(): number {
        return this.maxAttack * this.level;
    }

    private _getBaseHealth(): number {
        return 40;
    }

    private baseExp = 100;
    private expMultiplier = 1.5;

    constructor(id: string, name: string, telephoneNumber: string,
        level: number | null, exp: number | null,
        health: number | null, state: PlayerState | null,
        huntAgainst: MobModel | null, attack: number | null) {
        this.id = id;
        this.name = name;
        this.level = level ?? 1;
        this.exp = exp ?? 0;
        this.telephoneNumber = telephoneNumber;
        this.health = health ?? this._getBaseHealth();
        this.state = state ?? PlayerState.Idle;
        this.huntAgainst = huntAgainst;
        this.maxAttack = attack ?? 1.5;
    }

    static createNew(name: string, telephone: string): PlayerModel {
        const player = new PlayerModel(uuidv4(), name, telephone,
            null, null, null, null, null, null);
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
            maxAttack: this.maxAttack,
        };

        return playerDataObj;
    }

    static fromData(data: FirebaseFirestore.DocumentData): PlayerModel {
        const model = new PlayerModel(
            data.id, data.name, data.telephoneNumber,
            data.number, data.exp, data.health, data.state,
            MobModel.fromData(data.huntAgainst),
            data.maxAttack,
        );

        return model;
    }

    setPlayerDeath() {
        this.state = PlayerState.Idle;
        this.huntAgainst = null;
        this.level -= this.level == 1 ? 0 : 1;
        this.health = this._getBaseHealth();
    }

    getExpNeededForNextLevel(): number {
        return Math.floor(this.baseExp * Math.pow(this.expMultiplier, this.level - 1));
    }
}