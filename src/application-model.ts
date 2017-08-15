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
  public _fromJSON(value): void {
    this.constructor['_alias']
      .forEach(item => this[item['key']] = value[item['value']]);
  }

  /**
   * Converter of model format to backend data by aliases
   *
   * @return new object
   * @public
   */
  public _toJSON(): Object {
    let obj = {};

    this.constructor['_alias']
      .forEach(item => obj[item['value']] = this[item['key']]);
    return obj;
  }
}
