import { Type } from './type';
import { Model } from './application-model';
export declare abstract class StaticModel {
    /**
     * Creates an instance of pass model class with data
     *
     * @param data - json data of model
     * @param {Type<T extends Model>} model - model class to instance
     * @returns {T} - an instance of new model
     */
    static new<T extends Model>(model: Type<T>, data: any): T;
    /**
     * Creates an instances collection of pass model class with data array
     *
     * @param data[] - array of json data of model
     * @param {Type<T extends Model>} model - model class to instance
     * @returns {T} - an instance of new model
     */
    static newCollection<T extends Model>(model: Type<T>, data: object[]): T[];
}
