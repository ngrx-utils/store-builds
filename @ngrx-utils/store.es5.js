import { Injectable, NgModule } from '@angular/core';
import { map as map$1 } from 'rxjs/operator/map';
import { pluck as pluck$1 } from 'rxjs/operator/pluck';
import { distinctUntilChanged as distinctUntilChanged$1 } from 'rxjs/operator/distinctUntilChanged';
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
/**
 * \@internal
 */
NgrxSelect.store = undefined;
NgrxSelect.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgrxSelect.ctorParameters = function () { return []; };
/**
 * @template T, K
 * @param {?=} pathOrMapFn
 * @param {...?} paths
 * @return {?}
 */
function Select(pathOrMapFn) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return function (target, name) {
        var /** @type {?} */ mapped$;
        var /** @type {?} */ source$ = NgrxSelect.store;
        if (!source$) {
            throw new Error('NgrxSelect not connected to store!');
        }
        if (!pathOrMapFn) {
            pathOrMapFn = name;
        }
        if (typeof pathOrMapFn === 'string') {
            mapped$ = pluck$1.call.apply(pluck$1, [source$, pathOrMapFn].concat(paths));
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = map$1.call(source$, pathOrMapFn);
        }
        else {
            throw new TypeError("Unexpected type '" + typeof pathOrMapFn + "' in select operator," + " expected 'string' or 'function'");
        }
        if (delete target[name]) {
            Object.defineProperty(target, name, {
                get: function () {
                    return distinctUntilChanged$1.call(mapped$);
                },
                enumerable: true,
                configurable: true
            });
        }
    };
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgrxUtilsModule = /** @class */ (function () {
    function NgrxUtilsModule() {
    }
    return NgrxUtilsModule;
}());
NgrxUtilsModule.decorators = [
    { type: NgModule, args: [{
                providers: [NgrxSelect]
            },] },
];
/** @nocollapse */
NgrxUtilsModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */
export { NgrxUtilsModule, Select, NgrxSelect };
//# sourceMappingURL=store.es5.js.map
