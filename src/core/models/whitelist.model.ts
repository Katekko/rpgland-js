import { DataModel } from "../abstractions/models/data_model";
import { Data } from "../abstractions/service/store";

export class WhitelistModel extends DataModel {
    public number: string;
    public allow: boolean;

    constructor(number: string, allowed: boolean) {
        super(number);
        this.number = number;
        this.allow = allowed;
    }

    static fromData(data: Data): WhitelistModel {
        return new WhitelistModel(data.number, data.allow);
    }

    toObject(): object {
        throw new Error("Method not implemented.");
    }
}