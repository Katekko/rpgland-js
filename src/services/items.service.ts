import { ItemModel } from '../core/models/item.model';
import { store } from './firebase';

export class ItemsService {
    constructor() { }

    async migrateItems(): Promise<void> {
        try {
            const collection = store.collection('items');
            const coin = new ItemModel(
                '7c0cd60e-0fc2-4dc7-88bf-bacbfbbbd6e1',
                'Coin',
                1
            );

            await collection.doc(coin.id).set(coin.toObject());
        } catch (error) {
            throw error;
        }
    }
}
