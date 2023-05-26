import { Store } from './abstractions/service/store';
import { store } from './firebase';

export class FirebaseStore extends Store {
    constructor(tableName: string) {
        super(tableName);
    }

    async getAll(): Promise<any[]> {
        try {
            const collection = store.collection(this.tableName);
            const snapshot = await collection.get();
            const items = snapshot.docs.map((doc) => doc.data());
            return items;
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