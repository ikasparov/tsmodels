import { StaticModel } from './static-model';

/**
 * Base class for model implementation
 */
export abstract class Model extends StaticModel {

  /**
   * Converter of backend data to model format by aliases
   *
   * @param value - data from backend
   * @public
   */
  public _fromJSON(value) {
    Object.keys(this.constructor['_alias'])
      .forEach(
        key => {
          this._createItem(value, this.constructor['_alias'][key]);
        }
      );
  }

  /**
   *
   * @param value - data from backend
   * @private
   */
  public _updateFromJSON(value) {
    Object.keys(value).forEach((key) => {
      const item = this.constructor['_alias'][key];
      if (item) {
        this._createItem(value, item);
      }
    })
  }

  /**
   * Converter of model format to backend data by aliases
   *
   * @param {string[]} only - export only set fields (needs to set export names)
   * @return new object
   * @public
   */
  public _toJSON(only?: string[]) {
    const obj = {};
    let keys = Object.keys(this.constructor['_alias']);

    if (only) {
      keys = keys.filter(x => only.indexOf(x) > -1)
    }

    keys
      .forEach(
        key => {
          const value = this[key];
          const item = this.constructor['_alias'][key];

          if (item['type']) {
            if (Array.isArray(value)) {
              obj[item['value']] = value.map(x => x._toJSON());
            } else if (this._isObject(value)) {
              obj[item['value']] = value._toJSON();
            }
          } else {
            obj[item['value']] = this[item['key']];
          }
        }
      );
    return obj;
  }

  private _createObject(item, obj): Object {
    const newObj = new item['type']();
    newObj._fromJSON(obj);
    return newObj;
  }

  private _isObject(item): boolean {
    return Object.prototype.toString.call(item) === '[object Object]';
  }

  private _createItem(value, item) {
    const newValue = value[item['value']];

    if (item['type']) {
      if (Array.isArray(newValue)) {
        this[item['key']] = newValue.map(x => this._createObject(item, x));
      } else if (this._isObject(newValue)) {
        this[item['key']] = this._createObject(item, newValue);
      }
    } else {
      this[item['key']] = value[item['value']];
    }
  }
}

/**
 * @deprecated Use the `AppModel` instead. Will be remove in version 1.0.0
 */
export const ApplicationModel = Model;

/**
 * @deprecated Use the `AppModel` instead. Will be remove in version 1.0.0
 */
export const AppModel = Model;
