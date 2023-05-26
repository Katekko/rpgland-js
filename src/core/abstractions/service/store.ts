export type Data = {[field: string]: any};

export abstract class Store {
    protected tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    abstract getAll(): Promise<Data[]>;

    abstract save(data: Data): Promise<void>
}