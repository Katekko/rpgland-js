import { MobsService } from '../../services/mobs.service';
import { MobFactory } from '../../core/factories/mob.factory';
import MobModel from '../../core/models/mob.model';
import { MockStore } from '../mocks/mock_store';
import { ItemModel } from '../../core/models/item.model';

describe('MobsService', () => {
    let mobsService: MobsService;
    let mockStore: MockStore;

    beforeEach(() => {
        mockStore = new MockStore('mobs');
        mockStore.save = jest.fn().mockResolvedValue(undefined);
        mockStore.getAll = jest.fn().mockResolvedValue(undefined);
        mobsService = new MobsService(mockStore);
    });

    describe('migrate', () => {
        it('should migrate mobs to the store', async () => {
            const mockMobs = [MobFactory.makeGoblin(), MobFactory.makeSlime()];
            MobFactory.getAllMobsForMigration = jest.fn().mockReturnValue(mockMobs);

            await mobsService.migrate();

            expect(mockStore.save).toHaveBeenCalledTimes(mockMobs.length);
            for (const mob of mockMobs) {
                expect(mockStore.save).toHaveBeenCalledWith(mob);
            }
        });

        it('should throw an error if migration fails', async () => {
            const errorMessage = 'Migration failed';
            MobFactory.getAllMobsForMigration = jest.fn().mockImplementation(() => {
                throw new Error(errorMessage);
            });

            await expect(mobsService.migrate()).rejects.toThrowError(errorMessage);
        });
    });

    describe('getAllMobs', () => {
        it('should return all mobs', async () => {
            const mockResponse = [MobFactory.makeGoblin(), MobFactory.makeSlime()];
            const mockMobs: MobModel[] = [MobFactory.makeGoblin(), MobFactory.makeSlime()];

            mockStore.getAll = jest.fn().mockResolvedValue(mockResponse);
            MobModel.fromData = jest.fn().mockImplementation((data) => {
                const model = new MobModel(
                    data.id,
                    data.name,
                    data.level,
                    data.expDrop,
                    data.itemsDrop.map((e: any) => ItemModel.fromData(e)),
                    data.health,
                    data.chanceToAppear,
                    data.attack,
                );
                return model;
            });

            const result = await mobsService.getAllMobs();

            expect(mockStore.getAll).toHaveBeenCalled();
            expect(MobModel.fromData).toHaveBeenCalledTimes(mockResponse.length);
            expect(result).toEqual(mockMobs);
        });

        it('should throw an error if retrieval fails', async () => {
            const errorMessage = 'Retrieval failed';
            mockStore.getAll = jest.fn().mockRejectedValue(new Error(errorMessage));

            await expect(mobsService.getAllMobs()).rejects.toThrowError(errorMessage);
        });
    });
});
