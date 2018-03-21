import { Store } from '@ngrx/store';
export declare class NgrxSelect {
    /**
     * @internal
     */
    static store: Store<any> | undefined;
    /**
     * @internal
     */
    connect(store: Store<any>): void;
}
export declare class NgrxSelectModule {
    constructor(ngrxSelect: NgrxSelect, store: Store<any>, module: NgrxSelectModule);
}
export declare class NgrxUtilsModule {
    constructor(module: NgrxUtilsModule);
}
