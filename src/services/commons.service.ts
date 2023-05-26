import { Service } from '../core/abstractions/service/service';
import { Store } from '../core/abstractions/service/store';
import { WhitelistModel } from '../core/models/whitelist.model';

export class CommonsService extends Service {
  constructor(store: Store) {
    super(store);
  }

  async getWhitelist(): Promise<WhitelistModel[]> {
    try {
      const models = await this.store.getAll(WhitelistModel);
      return models;
    } catch (error) {
      throw error;
    }
  }
}
