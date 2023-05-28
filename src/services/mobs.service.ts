import { MobFactory } from '../core/factories/mob.factory';
import { MobModel } from '../core/models/mob.model';
import { Service } from '../core/abstractions/service/service';
import { Store } from '../core/abstractions/service/store';

export class MobsService extends Service {
    constructor(store: Store) {
        super(store);
    }

    async migrate(): Promise<void> {
        try {
            const items = MobFactory.getAllMobsForMigration();
            for (const item of items) {
                await this.store.save(item);
            }
            console.log('[RPG LAND] MOBS- Migration completed successfully.');
        } catch (err) {
            console.error('[RPG LAND] MOBS- Migration failed:', err);
            throw err;
        }
    }

    async getAllMobs(): Promise<MobModel[]> {
        try {
            const response = await this.store.getAll(MobModel);
            return response;
        } catch (err) {
            throw err;
        }
    }
}
