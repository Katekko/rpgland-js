export class PlayerData {
    public id: string;
    public name: string;
    public level: number;
    public exp: number;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.level = 1;
        this.exp = 0;
    }

    toObject(): object {
        const playerDataObj = {
            id: this.id,
            name: this.name,
            level: this.level,
            exp: this.exp,
        };

        return playerDataObj;
    }
}