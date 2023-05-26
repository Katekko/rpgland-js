import { Store } from './store';

export abstract class Service {
  protected store: Store;

  constructor(store: Store) {
    this.store = store;
  }
}