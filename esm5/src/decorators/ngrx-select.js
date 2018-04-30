/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import * as i0 from "@angular/core";
var NgrxSelect = /** @class */ (function () {
    function NgrxSelect() {
    }
    /**
     * @param {?} store
     * @return {?}
     */
    NgrxSelect.prototype.connect = function (store) {
        NgrxSelect.store = store;
    };
    return NgrxSelect;
}());
export { NgrxSelect };
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
var NgrxSelectModule = /** @class */ (function () {
    /**
     * @param {?} ngrxSelect
     * @param {?} store
     */
    function NgrxSelectModule(ngrxSelect, store) {
        if (NgrxSelect.store === null) {
            ngrxSelect.connect(store);
        }
    }
    return NgrxSelectModule;
}());
export { NgrxSelectModule };
NgrxSelectModule.decorators = [
    { type: NgModule },
];
/** @nocollapse */
NgrxSelectModule.ctorParameters = function () { return [
    { type: NgrxSelect, },
    { type: Store, },
]; };
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
