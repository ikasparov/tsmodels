import { Model } from './application-model';
import { Type } from './type';

export function Alias<T extends Model>(alias?: string, type?: Type<T>) {
  return function (target: Object, propertyKey: string | symbol) {
    target.constructor['_alias'] = target['constructor']['_alias'] || {};

    const value = alias || propertyKey;

    if (!target.constructor['_alias'][value]) {
      target.constructor['_alias'][value] = {
        key: propertyKey,
        value: value,
        type: type
      };
    }
  };
}
