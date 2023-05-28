import { DataModel } from "../abstractions/models/data_model";
import { Data } from "../abstractions/service/store";

export class WhitelistModel extends DataModel {
    public number: string;
    public allow: boolean;

    constructor(number: string, allow: boolean) {
        super(number);
        this.number = number;
        this.allow = allow;
    }

    static fromData(data: Data): WhitelistModel {
        return new WhitelistModel(data.number, data.allow);
    }

    toObject(): object {
        const obj = {
            number: this.number,
            allow: this.allow,
        }

        return obj;
    }

    toString(): string {
        return `[PERSON]: ${this.number} | ${this.allow}`;
    }
}