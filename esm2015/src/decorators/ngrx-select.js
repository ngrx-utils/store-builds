/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import * as i0 from "@angular/core";
export class NgrxSelect {
    /**
     * @param {?} store
     * @return {?}
     */
    connect(store) {
        NgrxSelect.store = store;
    }
}
NgrxSelect.store = null;
NgrxSelect.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */ NgrxSelect.ngInjectableDef = i0.defineInjectable({ factory: function NgrxSelect_Factory() { return new NgrxSelect(); }, token: NgrxSelect, providedIn: "root" });
function NgrxSelect_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgrxSelect.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgrxSelect.ctorParameters;
    /** @type {?} */
    NgrxSelect.store;
}
export class NgrxSelectModule {
    /**
     * @param {?} ngrxSelect
     * @param {?} store
     */
    constructor(ngrxSelect, store) {
        if (NgrxSelect.store === null) {
            ngrxSelect.connect(store);
        }
    }
}
NgrxSelectModule.decorators = [
    { type: NgModule },
];
/** @nocollapse */
NgrxSelectModule.ctorParameters = () => [
    { type: NgrxSelect, },
    { type: Store, },
];
function NgrxSelectModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgrxSelectModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgrxSelectModule.ctorParameters;
}
//# sourceMappingURL=ngrx-select.js.map
