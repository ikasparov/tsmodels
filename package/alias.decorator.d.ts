import { Model } from './application-model';
import { Type } from './type';
export declare function Alias<T extends Model>(alias?: string, type?: Type<T>): (target: Object, propertyKey: string | symbol) => void;
