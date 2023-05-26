import { Data, Store } from "../../core/abstractions/service/store";

export class MockStore extends Store {
    tableName = 'mockTable';

    async getAll(): Promise<Data[]> {
        return [];
    }

    async save(data: any): Promise<void> {}
}