import { Type } from './type';
/**
 * Base class for model implementation
 */
export declare abstract class Model {
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
    /**
     * Converter of backend data to model format by aliases
     *
     * @param value - data from backend
     * @public
     */
    _fromJSON(value: any): void;
    /**
     *
     * @param value - data from backend
     * @private
     */
    _updateFromJSON(value: any): void;
    /**
     * Converter of model format to backend data by aliases
     *
     * @param {string[]} only - export only set fields (needs to set export names)
     * @return new object
     * @public
     */
    _toJSON(only?: string[]): {};
    private _createObject(item, obj);
    private _isObject(item);
    private _createItem(value, item);
}
/**
 * @deprecated Use the `AppModel` instead. Will be remove in version 1.0.0
 */
export declare const ApplicationModel: typeof Model;
/**
 * @deprecated Use the `AppModel` instead. Will be remove in version 1.0.0
 */
export declare const AppModel: typeof Model;
