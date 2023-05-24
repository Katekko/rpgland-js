export class PlayerModel {
    public id: string;
    public name: string;
    public level: number;
    public exp: number;
    public telephoneNumber: string;

    constructor(id: string, name: string, telephoneNumber: string, level: number | null, exp: number | null) {
        this.id = id;
        this.name = name;
        this.level = level ?? 1;
        this.exp = exp ?? 0;
        this.telephoneNumber = telephoneNumber;
    }

    toObject(): object {
        const playerDataObj = {
            id: this.id,
            name: this.name,
            level: this.level,
            exp: this.exp,
            telephoneNumber: this.telephoneNumber,
        };

        return playerDataObj;
    }
}