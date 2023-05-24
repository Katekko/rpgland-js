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

    public huntAgainst: String | null;


    constructor(id: string, name: string, telephoneNumber: string,
        level: number | null, exp: number | null,
        health: number | null, state: PlayerState | null, huntAgainst: String | null) {
        this.id = id;
        this.name = name;
        this.level = level ?? 1;
        this.exp = exp ?? 0;
        this.telephoneNumber = telephoneNumber;
        this.health = health ?? 40;
        this.state = state ?? PlayerState.Idle;
        this.huntAgainst = huntAgainst;
    }

    static createNew(name: string, telephone: string ): PlayerModel {
        const player = new PlayerModel(uuidv4(), name, telephone, null, null, null, null, null);
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
            huntAgainst: this.huntAgainst,
        };

        return playerDataObj;
    }

    static fromData(data: FirebaseFirestore.DocumentData): PlayerModel {
        const model = new PlayerModel(
            data.id, data.name, data.telephoneNumber,
            data.number, data.exp, data.health, data.state, 
            data.huntAgainst.id,
        );

        return model;
    }
}