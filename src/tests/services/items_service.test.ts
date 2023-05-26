import { ItemsService } from '../../services/items.service';
import { ItemFactory } from '../../core/factories/item.factory';
import { MockStore } from '../mocks/mock_store';

describe('ItemsService', () => {
    let itemsService: ItemsService;
    let mockStore: MockStore;

    beforeEach(() => {
        mockStore = new MockStore('items');
        mockStore.save = jest.fn().mockResolvedValue(undefined);
        itemsService = new ItemsService(mockStore);
    });

    describe('migrateItems', () => {
        it('should migrate items to the store', async () => {
            const mockItems = [ItemFactory.makeCoin()];
            jest.spyOn(ItemFactory, 'getAllItemsForMigration').mockReturnValue(mockItems);

            await itemsService.migrate();

            expect(ItemFactory.getAllItemsForMigration).toHaveBeenCalled();
            expect(mockStore.save).toHaveBeenCalledTimes(mockItems.length);
        });

        it('should throw an error if migration fails', async () => {
            const errorMessage = 'Failed to migrate items';
            jest.spyOn(mockStore, 'save').mockRejectedValue(new Error(errorMessage));

            await expect(itemsService.migrate()).rejects.toThrowError(errorMessage);
        });
    });
});
