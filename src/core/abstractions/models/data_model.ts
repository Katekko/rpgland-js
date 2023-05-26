import { Data } from "../service/store";

export abstract class DataModel {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }

  static fromData(data: Data): DataModel {
    throw new Error('fromData method must be implemented');
  }

  abstract toObject(): object;
}