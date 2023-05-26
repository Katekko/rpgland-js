import { CommonsService } from "../../services/commons.service";
import { ItemsService } from "../../services/items.service";
import { MobsService } from "../../services/mobs.service";
import { PlayersService } from "../../services/players.service";
import { FirebaseStore } from "../firebase_store";

export class ServiceFactory {
    static makeItemsService(): ItemsService {
        const store = new FirebaseStore('items');
        return new ItemsService(store);
    }

    static makeMobsService(): MobsService {
        const store = new FirebaseStore('mobs');
        return new MobsService(store);
    }

    static makePlayersService(): PlayersService {
        const store = new FirebaseStore('players');
        return new PlayersService(store);
    }

    static makeCommonsService(): CommonsService {
        const store = new FirebaseStore('whitelist');
        return new CommonsService(store);
    }
} 