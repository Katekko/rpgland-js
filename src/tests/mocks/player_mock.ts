import { PlayerModel } from "../../core/models/player.model";

export class MockPlayerModel extends PlayerModel {
    constructor() {
        super('', '', '', null, null, null, null, null, null, null);
    }

    static createMockPlayer(): MockPlayerModel {
        return new MockPlayerModel();
    }

    // Mock any additional methods or properties you want to use in your tests
}