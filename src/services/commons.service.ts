import { ItemFactory } from '../core/factories/item.factory';
import { store } from './firebase';

export class CommonsService {
    constructor() { }

    async getWhitelist(): Promise<string[]> {
        try {
          const collection = store.collection('whitelist');
          const snapshot = await collection.get();
          const whitelistedNumbers = snapshot.docs.map((doc) => doc.id);
          return whitelistedNumbers;
        } catch (error) {
          throw error;
        }
      }
}
