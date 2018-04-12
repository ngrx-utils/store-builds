import { Store } from '@ngrx/store';
export declare class NgrxSelect {
    static store: Store<any> | undefined;
    connect(store: Store<any>): void;
}
export declare class NgrxSelectModule {
    constructor(ngrxSelect: NgrxSelect, store: Store<any>, module: NgrxSelectModule);
}
