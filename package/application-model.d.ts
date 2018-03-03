/**
 * Base class for model implementation
 */
export declare abstract class Model {
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
     * @return new object
     * @public
     */
    _toJSON(): {};
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
