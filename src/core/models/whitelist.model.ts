import { DataModel } from "../abstractions/models/data_model";
import { Data } from "../abstractions/service/store";

export class WhitelistModel extends DataModel {
    public number: string;
    public allowed: boolean;

    constructor(number: string, allowed: boolean) {
        super();
        this.number = number;
        this.allowed = allowed;
    }

    static fromData(data: Data): WhitelistModel {
        return new WhitelistModel(data.number, data.allowed);
    }
}