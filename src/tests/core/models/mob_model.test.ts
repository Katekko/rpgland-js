import { Data } from "../../../core/abstractions/service/store";
import { ItemModel } from "../../../core/models/item.model";
import { MobModel } from "../../../core/models/mob.model";

describe('MobModel', () => {
  const mockData: Data = {
    id: '1',
    name: 'Goblin',
    level: 10,
    expDrop: 100,
    itemsDrop: [ItemModel.fromData({ id: '1', name: 'Coin', value: 1, dropChance: 0.5, amount: 5, type: 0, price: 1 })],
    health: 100,
    chanceToAppear: 0.2,
    attack: 20,
  };

  describe('constructor', () => {
    it('should initialize the MobModel instance with provided values', () => {
      const mob = new MobModel(
        mockData.id,
        mockData.name,
        mockData.level,
        mockData.expDrop,
        mockData.itemsDrop,
        mockData.health,
        mockData.chanceToAppear,
        mockData.attack
      );

      expect(mob.id).toBe(mockData.id);
      expect(mob.name).toBe(mockData.name);
      expect(mob.level).toBe(mockData.level);
      expect(mob.expDrop).toBe(mockData.expDrop);
      expect(mob.itemsDrop).toBe(mockData.itemsDrop);
      expect(mob.health).toBe(mockData.health);
      expect(mob.chanceToAppear).toBe(mockData.chanceToAppear);
      expect(mob.attack).toBe(mockData.attack);
    });
  });

  describe('toObject', () => {
    it('should return the mob data as an object', () => {
      const mob = new MobModel(
        mockData.id,
        mockData.name,
        mockData.level,
        mockData.expDrop,
        mockData.itemsDrop,
        mockData.health,
        mockData.chanceToAppear,
        mockData.attack
      );

      const expectedDataObj = {
        id: mob.id,
        name: mob.name,
        level: mob.level,
        expDrop: mob.expDrop,
        itemsDrop: mob.itemsDrop.map((item) => item.toObject()),
        health: mob.health,
        chanceToAppear: mob.chanceToAppear,
        attack: mob.attack,
      };

      expect(mob.toObject()).toEqual(expectedDataObj);
    });
  });

  describe('fromData', () => {
    it('should create a MobModel instance from data object', () => {
      const data = {
        id: mockData.id,
        name: mockData.name,
        level: mockData.level,
        expDrop: mockData.expDrop,
        itemsDrop: mockData.itemsDrop.map((item: ItemModel) => item.toObject()),
        health: mockData.health,
        chanceToAppear: mockData.chanceToAppear,
        attack: mockData.attack,
      };

      const mob = MobModel.fromData(data);

      expect(mob instanceof MobModel).toBe(true);
      expect(mob.id).toBe(data.id);
      expect(mob.name).toBe(data.name);
      expect(mob.level).toBe(data.level);
      expect(mob.expDrop).toBe(data.expDrop);
      expect(mob.itemsDrop).toEqual(data.itemsDrop);
      expect(mob.health).toBe(data.health);
      expect(mob.chanceToAppear).toBe(data.chanceToAppear);
      expect(mob.attack).toBe(data.attack);
    });
  });
});
