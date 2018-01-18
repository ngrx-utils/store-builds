import { Store, Selector } from '@ngrx/store';
export declare class NgrxSelect {
    static store: Store<any> | undefined;
    static selectorMap: {
        [key: string]: Selector<any, any>;
    };
    connect(store: Store<any>): void;
}
export declare function Select<TState = any, TValue = any>(selector: Selector<TState, TValue>): (target: any, name: string) => void;
export declare function Select(selectorOrFeature?: string, ...paths: string[]): (target: any, name: string) => void;
