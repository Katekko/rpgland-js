export class PlayerData {
    public id: string;
    public name: string;
    public level: number;
    public exp: number;
    public telephoneNumber: string;

    constructor(id: string, name: string, telephoneNumber: string) {
        this.id = id;
        this.name = name;
        this.level = 1;
        this.exp = 0;
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