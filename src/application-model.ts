/**
 * Base class for model implementation
 */
export abstract class ApplicationModel {

  /**
   * Converter of backend data to model format by aliases
   *
   * @param value data from backend
   * @public
   */
  public _fromJSON(value) {
    this.constructor['_alias']
      .forEach(
        item => {
          const newValue = value[item['value']];

          if (item['type']) {
            if (Array.isArray(newValue)) {
              this[item['value']] = newValue.map(x => this._createObject(item, x));
            } else if (this._isObject(newValue)) {
              this[item['value']] = this._createObject(item, newValue);
            }
          } else {
            this[item['key']] = value[item['value']];
          }
        }
      );
  }

  /**
   * Converter of model format to backend data by aliases
   *
   * @return new object
   * @public
   */
  public _toJSON(): Object {
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

  private _createObject(item, obj) {
    const newObj = new item['type']();
    newObj._fromJSON(obj);
    return newObj;
  }

  private _isObject(item) {
    return Object.prototype.toString.call(item) === '[object Object]';
  }
}
