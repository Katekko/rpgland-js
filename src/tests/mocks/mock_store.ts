import { Store } from "../../core/abstractions/service/store";

export class MockStore extends Store {
    tableName = 'mockTable';

    async getAll(): Promise<any[]> {
        return [];
    }

    async save(data: any): Promise<void> {}
}