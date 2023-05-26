import { DataModel } from "../models/data_model";

export type Data = { [field: string]: any };

export abstract class Store {
    protected tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    abstract getAll<T extends DataModel>(modelClass: new (...args: any[]) => T): Promise<T[]>

    abstract save(data: Data): Promise<void>
}