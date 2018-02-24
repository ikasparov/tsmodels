/**
 * Base class for model implementation
 */
export abstract class Model {

  /**
   * Converter of backend data to model format by aliases
   *
   * @param value - data from backend
   * @param {boolean} shouldUpdateAll - do we need to make update for all variables or only for not defined?
   * @public
   */
  public _fromJSON(value, shouldUpdateAll = true) {
    Object.keys(this.constructor['_alias'])
      .forEach(
        key => {
          this._createItem(value, this.constructor['_alias'][key], shouldUpdateAll);
        }
      );
  }

  /**
   *
   * @param value - data from backend
   * @param {boolean} shouldUpdateAll - do we need to make update for all variables or only for not defined?
   * @private
   */
  public _updateFromJSON(value, shouldUpdateAll = true) {
    Object.keys(value).forEach((key) => {
      const item = this.constructor['_alias'][key];
      if (item) {
        this._createItem(value, item, shouldUpdateAll);
      }
    })
  }

  /**
   * Converter of model format to backend data by aliases
   *
   * @return new object
   * @public
   */
  public _toJSON() {
    const obj = {};

    this.constructor['_alias']
      .forEach(
        item => {
          const value = this[item['key']];

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

  private _createItem(value, item, shouldUpdateAll = true) {
    const newValue = value[item['value']];

    if (!shouldUpdateAll && this[item['key']] !== void 0) { return; }

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
