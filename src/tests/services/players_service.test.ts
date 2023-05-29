import { PlayersService } from '../../services/players.service';
import { MockStore } from '../mocks/mock_store';
import { MockPlayerModel } from '../mocks/player_mock';

describe('PlayersService', () => {
    let playersService: PlayersService;
    let mockStore: MockStore;

    beforeEach(() => {
        mockStore = new MockStore('players');
        mockStore.save = jest.fn().mockResolvedValue(undefined);
        playersService = new PlayersService(mockStore);
        console.log = jest.fn();
        console.error = jest.fn();
    });

    describe('migrate', () => {
        it('should migrate players to the store', async () => {
            const mockPlayers = [MockPlayerModel.createMockPlayer(), MockPlayerModel.createMockPlayer()];
            jest.spyOn(playersService, 'getAllPlayers').mockResolvedValue(mockPlayers);

            await playersService.migrate();

            expect(playersService.getAllPlayers).toHaveBeenCalled();
            expect(mockStore.save).toHaveBeenCalledTimes(mockPlayers.length);
            expect(console.log).toHaveBeenCalledWith('[RPG LAND] PLAYERS- Migration completed successfully.');
        });

        it('should throw an error if migration fails', async () => {
            const errorMessage = 'Migration failed';
            jest.spyOn(playersService, 'getAllPlayers').mockRejectedValue(new Error(errorMessage));

            await expect(playersService.migrate()).rejects.toThrowError(errorMessage);
            expect(console.error).toHaveBeenCalledWith('[RPG LAND] PLAYERS- Migration failed:', new Error(errorMessage));
        });
    });


    // Add more test cases for other methods in PlayersService if needed
});
