import { CommonsService } from '../../services/commons.service';
import { WhitelistModel } from '../../core/models/whitelist.model';
import { MockStore } from '../mocks/mock_store';

describe('CommonsService', () => {
    let commonsService: CommonsService;
    let mockStore: MockStore;

    beforeEach(() => {
        mockStore = new MockStore('whitelist');
        mockStore.getAll = jest.fn().mockResolvedValue([]);
        mockStore.save = jest.fn().mockResolvedValue(undefined);
        commonsService = new CommonsService(mockStore);
        console.log = jest.fn();
        console.error = jest.fn();
    });

    describe('getWhitelist', () => {
        it('should return an empty array if no whitelist models exist', async () => {
            const result = await commonsService.getWhitelist();

            expect(mockStore.getAll).toHaveBeenCalledWith(WhitelistModel);
            expect(result).toEqual([]);
        });

        it('should return an array of whitelist models', async () => {
            const mockWhitelist = [new WhitelistModel('1', true), new WhitelistModel('2', true)];
            jest.spyOn(mockStore, 'getAll').mockResolvedValue(mockWhitelist);

            const result = await commonsService.getWhitelist();

            expect(mockStore.getAll).toHaveBeenCalledWith(WhitelistModel);
            expect(result).toEqual(mockWhitelist);
        });

        it('should throw an error if getting whitelist models fails', async () => {
            const errorMessage = 'Failed to get whitelist models';
            jest.spyOn(mockStore, 'getAll').mockRejectedValue(new Error(errorMessage));

            await expect(commonsService.getWhitelist()).rejects.toThrowError(errorMessage);
        });
    });

    describe('saveWhitelistEntry', () => {
        it('should save a whitelist entry', async () => {
            const mockPerson = new WhitelistModel('1', true);

            await commonsService.saveWhitelistEntry(mockPerson);

            expect(mockStore.save).toHaveBeenCalledWith(mockPerson);
        });

        it('should throw an error if saving whitelist entry fails', async () => {
            const errorMessage = 'Failed to save whitelist entry';
            const mockPerson = new WhitelistModel('1', true);
            jest.spyOn(mockStore, 'save').mockRejectedValue(new Error(errorMessage));

            await expect(commonsService.saveWhitelistEntry(mockPerson)).rejects.toThrowError(errorMessage);
        });
    });
});
