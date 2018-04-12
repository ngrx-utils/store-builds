import { MonoTypeOperatorFunction } from 'rxjs';
export declare const destroy$: unique symbol;
/**
 * An operator that takes until destroy it takes a components this a parameter
 * returns a pipeable RxJS operator.
 */
export declare const untilDestroy: <T>(component: any) => MonoTypeOperatorFunction<T>;
/**
 * @internal
 */
export declare function addDestroyObservableToComponent(component: any): void;
