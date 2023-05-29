import { Data } from "../../../core/abstractions/service/store";
import { ItemType } from "../../../core/enums/item_type.enum";
import { ItemModel } from "../../../core/models/item.model";


describe('ItemModel', () => {
  const mockData: Data = {
    id: '1',
    name: 'Coin',
    value: 1,
    dropChance: 0.5,
    amount: 10,
    type: ItemType.Currency,
    price: 1,
  };

  describe('constructor', () => {
    it('should initialize the ItemModel instance with provided values', () => {
      const item = new ItemModel(
        mockData.id,
        mockData.name,
        mockData.value,
        mockData.dropChance,
        mockData.amount,
        mockData.type,
        mockData.price
      );

      expect(item.id).toBe(mockData.id);
      expect(item.name).toBe(mockData.name);
      expect(item.value).toBe(mockData.value);
      expect(item.dropChance).toBe(mockData.dropChance);
      expect(item.amount).toBe(mockData.amount);
      expect(item.type).toBe(mockData.type);
      expect(item.price).toBe(mockData.price);
    });
  });

  describe('toObject', () => {
    it('should return the item data as an object', () => {
      const item = new ItemModel(
        mockData.id,
        mockData.name,
        mockData.value,
        mockData.dropChance,
        mockData.amount,
        mockData.type,
        mockData.price
      );

      const expectedDataObj = {
        id: item.id,
        name: item.name,
        value: item.value,
        dropChance: item.dropChance,
        amount: item.amount,
        type: item.type,
        price: item.price,
      };

      expect(item.toObject()).toEqual(expectedDataObj);
    });
  });

  describe('fromData', () => {
    it('should create an ItemModel instance from data object', () => {
      const data = {
        id: mockData.id,
        name: mockData.name,
        value: mockData.value,
        dropChance: mockData.dropChance,
        amount: mockData.amount,
        type: mockData.type,
        price: mockData.price,
      };

      const item = ItemModel.fromData(data);

      expect(item instanceof ItemModel).toBe(true);
      expect(item.id).toBe(data.id);
      expect(item.name).toBe(data.name);
      expect(item.value).toBe(data.value);
      expect(item.dropChance).toBe(data.dropChance);
      expect(item.amount).toBe(data.amount);
      expect(item.type).toBe(data.type);
      expect(item.price).toBe(data.price);
    });
  });
});
