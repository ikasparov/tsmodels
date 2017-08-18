import { ApplicationModel as AppModel } from './application-model';
import { Type } from './type';

export function Alias<T extends AppModel>(alias?: string, type?: Type<T>) {
  return function (target: Object, propertyKey: string | symbol) {
    target.constructor['_alias'] = target['constructor']['_alias'] || [];
    target.constructor['_alias'].push({
      key: propertyKey,
      value: alias || propertyKey,
      type: type
    });
  };
}