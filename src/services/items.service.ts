import { ItemFactory } from '../core/factories/items.factory';
import { store } from './firebase';

export class ItemsService {
    constructor() { }

    async migrateItems(): Promise<void> {
        try {
            const collection = store.collection('items');
            const coin = ItemFactory.makeCoin();
            await collection.doc(coin.id).set(coin.toObject());
        } catch (error) {
            throw error;
        }
    }
}
