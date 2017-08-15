export function Alias(alias: string) {
  return function (target: Object, propertyKey: string | symbol) {
    target.constructor['_alias'] = target['constructor']['_alias'] || [];
    target.constructor['_alias'].push({ key: propertyKey, value: alias });
  };
}
