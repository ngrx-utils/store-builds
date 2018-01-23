import { Store } from '@ngrx/store';
export declare class NgrxSelect {
    connect(store: Store<any>): void;
}
export declare function Select<T, K>(mapFn: (state: T) => K): (target: any, name: string) => void;
export declare function Select(key?: string, ...paths: string[]): (target: any, name: string) => void;
