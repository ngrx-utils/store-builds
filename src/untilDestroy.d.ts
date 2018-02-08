import { Observable } from 'rxjs/Observable';
export declare const destroy$: symbol;
/**
 * an operator that takes until destroy it takes a components this a parameter
 * returns a lettable RxJS operator.
 */
export declare const untilDestroy: <T>(component: any) => (source: Observable<T>) => Observable<T>;
