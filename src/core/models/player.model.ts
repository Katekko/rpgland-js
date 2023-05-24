import { PlayerState } from "../enums/player_state.enum";

export class PlayerModel {
    public id: string;
    public name: string;
    public level: number;
    public exp: number;
    public telephoneNumber: string;
    public health: number;

    public state: PlayerState;


    constructor(id: string, name: string, telephoneNumber: string,
        level: number | null, exp: number | null, health: number | null, state: PlayerState | null) {
        this.id = id;
        this.name = name;
        this.level = level ?? 1;
        this.exp = exp ?? 0;
        this.telephoneNumber = telephoneNumber;
        this.health = health ?? 40;
        this.state = state ?? PlayerState.Idle;
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
        };

        return playerDataObj;
    }

    static fromData(data: FirebaseFirestore.DocumentData): PlayerModel {
        const model = new PlayerModel(
            data.id, data.name, data.telephoneNumber, 
            data.number, data.exp, data.health, data.state
        );

        return model;
    }
}