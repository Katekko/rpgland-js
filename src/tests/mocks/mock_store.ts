import { DataModel } from "../../core/abstractions/models/data_model";
import { Data, Store } from "../../core/abstractions/service/store";

export class MockStore extends Store {
    tableName = 'mockTable';

    async getAll<T extends DataModel>(modelClass: { new(...args: any[]): T }): Promise<T[]> {
        return [];
    }

    async save(data: DataModel): Promise<void> { }
}