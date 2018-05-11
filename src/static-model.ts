import { Type } from './type';
import { Model } from './application-model';

export abstract class StaticModel {
  /**
   * Creates an instance of pass model class with data
   *
   * @param data - json data of model
   * @param {Type<T extends Model>} model - model class to instance
   * @returns {T} - an instance of new model
   */
  public static new<T extends Model>(model: Type<T>, data): T {
    const instance = new model();
    instance._fromJSON(data);
    return instance;
  }

  /**
   * Creates an instances collection of pass model class with data array
   *
   * @param data[] - array of json data of model
   * @param {Type<T extends Model>} model - model class to instance
   * @returns {T} - an instance of new model
   */
  public static newCollection<T extends Model>(model: Type<T>, data: object[]): T[] {
    return data.map(x => {
      const instance = new model();
      instance._fromJSON(x);
      return instance;
    });
  }
}
