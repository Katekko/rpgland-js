import { v4 as uuidv4 } from 'uuid';
import { PlayerData } from '../core/models/player.model';
import { store } from './firebase';

export class PlayerService {
    constructor() { }

    async startPlayer(player: PlayerData): Promise<void> {
        try {
            const collection = store.collection('players');
            await collection.doc(player.id).set(player.toObject());
        } catch (error) {
            throw error;
        }
    }
}
