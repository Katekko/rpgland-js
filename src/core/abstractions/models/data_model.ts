import { Data } from "../service/store";

export abstract class DataModel {
  static fromData(data: Data): DataModel {
    throw new Error('fromData method must be implemented');
  }
}