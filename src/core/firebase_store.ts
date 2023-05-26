import { DataModel } from './abstractions/models/data_model';
import { Store } from './abstractions/service/store';
import { store } from './firebase';

export class FirebaseStore extends Store {
    constructor(tableName: string) {
        super(tableName);
    }

    getFirebaseCollection(): FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> {
        return store.collection(this.tableName);
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

    async save(data: DataModel): Promise<void> {
        try {
            if (!data.id) throw Error('Object whitout ID, fix your object dumb developer')
            const collection = store.collection(this.tableName);
            await collection.doc(data.id).set(data.toObject());
        } catch (error) {
            throw error;
        }
    }
}