import { v4 as uuidv4 } from 'uuid';
import { PlayerData as PlayerModel } from '../core/models/player.model';
import { store } from './firebase';

export class PlayerService {
    constructor() { }

    async savePlayer(player: PlayerModel): Promise<void> {
        try {
            const collection = store.collection('players');
            await collection.doc(player.id).set(player.toObject());
        } catch (error) {
            throw error;
        }
    }

    async getPlayer(player: PlayerModel): Promise<PlayerModel | null> {
        try {
            const collection = store.collection('players');
            const querySnapshot = await collection.where('telephoneNumber', '==', player.telephoneNumber).get();
            if (!querySnapshot.empty) {
                const documentSnapshot = querySnapshot.docs[0];
                const data = documentSnapshot.data();
                const model = new PlayerModel(
                    data.id, data.name, data.telephoneNumber, data.number, data.exp
                );
                return model;
            }
            
            return null;
        } catch (error) {
            throw error;
        }
    }
}
