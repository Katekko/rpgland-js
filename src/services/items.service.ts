import { ItemFactory } from '../core/factories/item.factory';
import { store } from './firebase';

export class ItemsService {
    constructor() { }

    async migrateItems(): Promise<void> {
        try {
            const collection = store.collection('items');
            const items = ItemFactory.getAllItemsForMigration();
            for (const item of items) {
                await collection.doc(item.id).set(item.toObject());
            }
        } catch (error) {
            throw error;
        }
    }
}
