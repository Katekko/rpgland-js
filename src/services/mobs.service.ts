import { ItemFactory } from '../core/factories/item.factory';
import { MobModel } from '../core/models/mob.model';
import { store } from './firebase';

export class MobService {
    constructor() { }

    async migrateMobs(): Promise<void> {
        try {
            const collection = store.collection('mobs');
            const slime = new MobModel(
                '6df300e0-4fec-4691-861f-cc4b237fc575',
                'Slime',
                1, 2, 
                [
                    ItemFactory.makeCoin(), 
                    ItemFactory.makeHealthPotion()
                ], 
                4, .5, 1,
            );

            await collection.doc(slime.id).set(slime.toObject());

            const goblin = new MobModel(
                '36e35b45-bae2-4f25-91a3-64fd1087e1ec',
                'Goblin',
                3, 5, 
                [
                    ItemFactory.makeCoin(), 
                    ItemFactory.makeHealthPotion()
                ],  
                8, .40, 4,
            );

            await collection.doc(slime.id).set(slime.toObject());

            const wolf = new MobModel(
                'ae6de135-37e1-4a6d-bf1f-1e5aecc8c491',
                'Wolf',
                5, 10, 
                [
                    ItemFactory.makeCoin(), 
                    ItemFactory.makeHealthPotion()
                ],   
                20, .10, 50,
            );

            await collection.doc(slime.id).set(slime.toObject());
            await collection.doc(goblin.id).set(goblin.toObject());
            await collection.doc(wolf.id).set(wolf.toObject());
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
