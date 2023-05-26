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
                await this.store.save(item.toObject());
            }
        } catch (error) {
            throw error;
        }
    }

    async getAllMobs(): Promise<MobModel[]> {
        try {
            const response = await this.store.getAll();

            const mobs: MobModel[] = [];
            response.forEach((data) => {
                const mob = MobModel.fromData(data)!
                mobs.push(mob);
            });

            return mobs;
        } catch (error) {
            throw error;
        }
    }
}
