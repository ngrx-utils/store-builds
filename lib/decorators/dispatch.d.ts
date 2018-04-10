import { Action, Store } from '@ngrx/store';
/**
 * @whatItDoes Dispatch method returned action.
 * @howToUse `@Dispatch() componentMethod() { return new Action() }`
 */
export declare function Dispatch(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function dispatch<T extends Action = Action>(source$: Store<any>, actions: T[]): void;
