import { Data } from "../../core/abstractions/service/store";
import { WhitelistModel } from "../../core/models/whitelist.model";

describe('WhitelistModel', () => {
  const mockData: Data = {
    number: '123456789',
    allow: true,
  };

  describe('constructor', () => {
    it('should initialize the WhitelistModel instance with provided values', () => {
      const whitelistEntry = new WhitelistModel(mockData.number, mockData.allow);

      expect(whitelistEntry.number).toBe(mockData.number);
      expect(whitelistEntry.allow).toBe(mockData.allow);
    });
  });

  describe('toObject', () => {
    it('should return the whitelist entry data as an object', () => {
      const whitelistEntry = new WhitelistModel(mockData.number, mockData.allow);

      const expectedDataObj = {
        number: whitelistEntry.number,
        allow: whitelistEntry.allow,
      };

      expect(whitelistEntry.toObject()).toEqual(expectedDataObj);
    });
  });

  describe('fromData', () => {
    it('should create a WhitelistModel instance from data object', () => {
      const data = {
        number: mockData.number,
        allow: mockData.allow,
      };

      const whitelistEntry = WhitelistModel.fromData(data);

      expect(whitelistEntry instanceof WhitelistModel).toBe(true);
      expect(whitelistEntry.number).toBe(data.number);
      expect(whitelistEntry.allow).toBe(data.allow);
    });
  });

  describe('toString', () => {
    it('should return a string representation of the whitelist entry', () => {
      const whitelistEntry = new WhitelistModel(mockData.number, mockData.allow);

      const expectedString = `[PERSON]: ${mockData.number} | ${mockData.allow}`;

      expect(whitelistEntry.toString()).toBe(expectedString);
    });
  });
});
