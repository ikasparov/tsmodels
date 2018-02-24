/**
 * Base class for model implementation
 */
export declare abstract class Model {
    /**
     * Converter of backend data to model format by aliases
     *
     * @param value - data from backend
     * @param {boolean} shouldUpdateAll - do we need to make update for all variables or only for not defined?
     * @public
     */
    _fromJSON(value: any, shouldUpdateAll?: boolean): void;
    /**
     *
     * @param value - data from backend
     * @param {boolean} shouldUpdateAll - do we need to make update for all variables or only for not defined?
     * @private
     */
    _updateFromJSON(value: any, shouldUpdateAll?: boolean): void;
    /**
     * Converter of model format to backend data by aliases
     *
     * @return new object
     * @public
     */
    _toJSON(): {};
    private _createObject(item, obj);
    private _isObject(item);
    private _createItem(value, item, shouldUpdateAll?);
}
/**
 * @deprecated Use the `AppModel` instead. Will be remove in version 1.0.0
 */
export declare const ApplicationModel: typeof Model;
/**
 * @deprecated Use the `AppModel` instead. Will be remove in version 1.0.0
 */
export declare const AppModel: typeof Model;
