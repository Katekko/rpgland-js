import { Message } from 'whatsapp-web.js';
import { Service } from '../core/abstractions/service/service';
import { Store } from '../core/abstractions/service/store';
import { PlayerModel } from '../core/models/player.model';
import { CustomMessage } from '../handle_messages';

export class PlayersService extends Service {
    constructor(store: Store) {
        super(store);
    }

    async savePlayer(player: PlayerModel): Promise<void> {
        try {
            await this.store.save(player);
        } catch (error) {
            throw error;
        }
    }

    private async _getPlayerByPhone(phone: string): Promise<PlayerModel | null> {
        try {
            // TODO: Allow send query thrghou store
            const collection = require('../core/firebase').store.collection('players');
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

    async getPlayerByMessage(message: CustomMessage): Promise<PlayerModel | null> {
        try {
            const phone = message.phone;
            return this._getPlayerByPhone(phone);
        } catch (err) {
            throw err;
        }
    }

    async getAllPlayers(): Promise<PlayerModel[]> {
        try {
            const response = this.store.getAll(PlayerModel);
            return response;
        } catch (err) {
            throw err;
        }
    }

    async migrate(): Promise<void> {
        try {
            const players = await this.getAllPlayers();
            for (const item of players) {
                await this.store.save(item);
            }
            console.log('[RPG LAND] PLAYERS- Migration completed successfully.');
        } catch (err) {
            console.error('[RPG LAND] PLAYERS- Migration failed:', err);
            throw err;
        }
    }
}
