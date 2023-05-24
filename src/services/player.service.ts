import { v4 as uuidv4 } from 'uuid';
import { PlayerModel as PlayerModel } from '../core/models/player.model';
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

    async getPlayerByPhone(phone: string): Promise<PlayerModel | null> {
        try {
            const collection = store.collection('players');
            const querySnapshot = await collection.where('telephoneNumber', '==', phone).get();
            if (!querySnapshot.empty) {
                const documentSnapshot = querySnapshot.docs[0];
                const data = documentSnapshot.data();
                const model = PlayerModel.fromData(data);
                return model;
            }
            
            return null;
        } catch (error) {
            throw error;
        }
    }
}
