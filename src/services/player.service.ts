import { Message } from 'whatsapp-web.js';
import { PlayerModel } from '../core/models/player.model';
import { store } from '../core/firebase';

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

    private async _getPlayerByPhone(phone: string): Promise<PlayerModel | null> {
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

    async getPlayerByMessage(message: Message): Promise<PlayerModel | null> {
        try {
            const contact = await message.getContact();
            const phone = contact.number;
            return this._getPlayerByPhone(phone);
        } catch (err) {
            throw err;
        }
    }

    async getAllPlayers(): Promise<PlayerModel[]> {
        try {
            const collection = store.collection('players');
            const querySnapshot = await collection.get();
            const players: PlayerModel[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const model = PlayerModel.fromData(data);
                players.push(model);
            });
            return players;
        } catch (error) {
            throw error;
        }
    }
}
