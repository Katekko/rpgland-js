export abstract class Store {
    protected tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    abstract getAll(): Promise<any[]>;

    abstract save(data: any): Promise<void>
}