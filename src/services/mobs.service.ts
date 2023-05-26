import { ItemFactory } from '../core/factories/item.factory';
import { MobFactory } from '../core/factories/mob.factory';
import { MobModel } from '../core/models/mob.model';
import { store } from '../core/firebase';

export class MobService {
    constructor() { }

    async migrateMobs(): Promise<void> {
        try {
            const collection = store.collection('mobs');
            const items = MobFactory.getAllMobsForMigration();
            for (const item of items) {
                await collection.doc(item.id).set(item.toObject());
            }
        } catch (error) {
            throw error;
        }
    }

    async getAllMobs(): Promise<MobModel[]> {
        try {
            const collection = store.collection('mobs');
            const querySnapshot = await collection.get();

            const mobs: MobModel[] = [];
            querySnapshot.forEach((documentSnapshot) => {
                const data = documentSnapshot.data();
                const mob = MobModel.fromData(data)!
                mobs.push(mob);
            });

            return mobs;
        } catch (error) {
            throw error;
        }
    }
}
