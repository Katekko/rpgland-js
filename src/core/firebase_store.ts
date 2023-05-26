import { DataModel } from './abstractions/models/data_model';
import { Data, Store } from './abstractions/service/store';
import { store } from './firebase';

export class FirebaseStore extends Store {
    constructor(tableName: string) {
        super(tableName);
    }

    async getAll<T extends DataModel>(modelClass: { new(...args: any[]): T }): Promise<T[]> {
        try {
            const collection = store.collection(this.tableName);
            const snapshot = await collection.get();
            const items = snapshot.docs.map((doc) => doc.data());
            const response = items.map((e) => (modelClass as any).fromData(e));
            return response;
        } catch (error) {
            throw error;
        }
    }

    async save(data: any): Promise<void> {
        try {
            const collection = store.collection(this.tableName);
            await collection.add(data);
        } catch (error) {
            throw error;
        }
    }
}