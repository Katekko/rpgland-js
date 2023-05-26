import { Service } from '../core/abstractions/service/service';
import { Store } from '../core/abstractions/service/store';
import { ItemFactory } from '../core/factories/item.factory';

export class ItemsService extends Service {
    constructor(store: Store) {
        super(store);
    }

    async migrate(): Promise<void> {
        try {
            const items = ItemFactory.getAllItemsForMigration();
            for (const item of items) {
                await this.store.save(item.toObject());
            }
        } catch (error) {
            throw error;
        }
    }
}