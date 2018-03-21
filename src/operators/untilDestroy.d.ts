import { Observable } from 'rxjs/Observable';
export declare const destroy$: symbol;
/**
 * An operator that takes until destroy it takes a components this a parameter
 * returns a pipeable RxJS operator.
 */
export declare const untilDestroy: <T>(component: any) => (source: Observable<T>) => Observable<T>;
/**
 * @internal
 */
export declare function addDestroyObservableToComponent(component: any): void;
