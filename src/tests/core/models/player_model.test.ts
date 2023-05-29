import { PlayerState } from "../../../core/enums/player_state.enum";
import { ItemFactory } from "../../../core/factories/item.factory";
import { MobFactory } from "../../../core/factories/mob.factory";
import { PlayerModel } from "../../../core/models/player.model";


describe('PlayerModel', () => {
    const mockData = {
        id: '1',
        name: 'John Doe',
        level: 10,
        exp: 1000,
        telephoneNumber: '123456789',
        health: 100,
        state: PlayerState.Idle,
        huntAgainst: MobFactory.makeGoblin(),
        baseAttack: 20,
        inventory: [ItemFactory.makeCoin()],
        language: 'en'
    };

    describe('constructor', () => {
        it('should initialize the PlayerModel instance with provided values', () => {
            const player = new PlayerModel(
                mockData.id,
                mockData.name,
                mockData.telephoneNumber,
                mockData.level,
                mockData.exp,
                mockData.health,
                mockData.state,
                mockData.huntAgainst,
                mockData.baseAttack,
                mockData.inventory,
                mockData.language
            );

            expect(player.id).toBe(mockData.id);
            expect(player.name).toBe(mockData.name);
            expect(player.telephoneNumber).toBe(mockData.telephoneNumber);
            expect(player.level).toBe(mockData.level);
            expect(player.exp).toBe(mockData.exp);
            expect(player.health).toBe(mockData.health);
            expect(player.state).toBe(mockData.state);
            expect(player.huntAgainst).toBe(mockData.huntAgainst);
            expect(player.baseAttack).toBe(mockData.baseAttack);
            expect(player.inventory).toBe(mockData.inventory);
            expect(player.language).toBe(mockData.language);
        });

        it('should set default values if optional parameters are not provided', () => {
            const player = new PlayerModel(
                mockData.id,
                mockData.name,
                mockData.telephoneNumber,
                null, null, null, null, null, null, null
            );

            expect(player.id).toBe(mockData.id);
            expect(player.name).toBe(mockData.name);
            expect(player.telephoneNumber).toBe(mockData.telephoneNumber);
            expect(player.level).toBe(1);
            expect(player.exp).toBe(0);
            expect(player.health).toBe(player.getMaxHealth());
            expect(player.state).toBe(PlayerState.Idle);
            expect(player.huntAgainst).toBe(null);
            expect(player.baseAttack).toBe(5);
            expect(player.inventory).toEqual([]);
            expect(player.language).toBe('pt_BR');
        });
    });

    describe('getMaxAttack', () => {
        it('should return the maximum attack of the player based on the base attack and level', () => {
            const player = new PlayerModel(
                mockData.id,
                mockData.name,
                mockData.telephoneNumber,
                mockData.level,
                mockData.exp,
                mockData.health,
                mockData.state,
                mockData.huntAgainst,
                mockData.baseAttack,
                mockData.inventory,
                mockData.language
            );

            const expectedMaxAttack = player.baseAttack * player.level;
            const actualMaxAttack = player.getMaxAttack();

            expect(actualMaxAttack).toBe(expectedMaxAttack);
        });
    });

    describe('getRandomAttack', () => {
        it('should return a random attack value within the player\'s attack range', () => {
            const player = new PlayerModel(
                mockData.id,
                mockData.name,
                mockData.telephoneNumber,
                mockData.level,
                mockData.exp,
                mockData.health,
                mockData.state,
                mockData.huntAgainst,
                mockData.baseAttack,
                mockData.inventory,
                mockData.language
            );

            const maxAttack = player.getMaxAttack();
            const randomAttack = player.getRandomAttack();

            expect(randomAttack).toBeGreaterThanOrEqual(1);
            expect(randomAttack).toBeLessThanOrEqual(maxAttack);
        });
    });

    describe('setPlayerDeath', () => {
        it('should set the player\'s state to Idle, reset huntAgainst and decrease the level and health', () => {
            const player = new PlayerModel(
                mockData.id,
                mockData.name,
                mockData.telephoneNumber,
                mockData.level,
                mockData.exp,
                mockData.health,
                mockData.state,
                mockData.huntAgainst,
                mockData.baseAttack,
                mockData.inventory,
                mockData.language
            );

            const originalLevel = player.level;
            const originalHealth = player.health;

            player.setPlayerDeath();

            expect(player.state).toBe(PlayerState.Idle);
            expect(player.huntAgainst).toBe(null);
            expect(player.level).toBe(originalLevel == 1 ? 1 : originalLevel - 1);
            expect(player.health).toBe(player.getMaxHealth());
            expect(player.exp).toBe(0);
        });
    });

    describe('getExpNeededForNextLevel', () => {
        it('should return the experience needed to reach the next level', () => {
            const player = new PlayerModel(
                mockData.id,
                mockData.name,
                mockData.telephoneNumber,
                mockData.level,
                mockData.exp,
                mockData.health,
                mockData.state,
                mockData.huntAgainst,
                mockData.baseAttack,
                mockData.inventory,
                mockData.language
            );

            const expectedExpNeeded = Math.floor(100 * Math.pow(1.5, player.level - 1));
            expect(player.getExpNeededForNextLevel()).toBe(expectedExpNeeded);
        });
    });

    describe('toObject', () => {
        it('should return the player data as an object', () => {
            const player = new PlayerModel(
                mockData.id,
                mockData.name,
                mockData.telephoneNumber,
                mockData.level,
                mockData.exp,
                mockData.health,
                mockData.state,
                mockData.huntAgainst,
                mockData.baseAttack,
                mockData.inventory,
                mockData.language
            );

            const expectedDataObj = {
                id: player.id,
                name: player.name,
                level: player.level,
                exp: player.exp,
                telephoneNumber: player.telephoneNumber,
                health: player.health,
                state: player.state,
                huntAgainst: player.huntAgainst ? player.huntAgainst.toObject() : null,
                maxAttack: player.baseAttack,
                inventory: player.inventory.map((item) => item.toObject()),
                language: player.language
            };

            expect(player.toObject()).toEqual(expectedDataObj);
        });
    });

    describe('fromData', () => {
        it('should create a PlayerModel instance from data object', () => {
            const data = {
                id: mockData.id,
                name: mockData.name,
                level: mockData.level,
                exp: mockData.exp,
                telephoneNumber: mockData.telephoneNumber,
                health: mockData.health,
                state: mockData.state,
                huntAgainst: mockData.huntAgainst ? mockData.huntAgainst?.toObject() : null,
                maxAttack: mockData.baseAttack,
                inventory: mockData.inventory.map((item) => item.toObject()),
                language: mockData.language
            };

            const player = PlayerModel.fromData(data);

            expect(player instanceof PlayerModel).toBe(true);
            expect(player.id).toBe(data.id);
            expect(player.name).toBe(data.name);
            expect(player.level).toBe(data.level);
            expect(player.exp).toBe(data.exp);
            expect(player.telephoneNumber).toBe(data.telephoneNumber);
            expect(player.health).toBe(data.health);
            expect(player.state).toBe(data.state);
            expect(player.huntAgainst).toEqual(data.huntAgainst);
            expect(player.baseAttack).toBe(data.maxAttack);
            expect(player.inventory.length).toBe(data.inventory.length);
            expect(player.language).toBe(data.language);
        });
    });
});
