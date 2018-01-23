import { Injectable, NgModule } from '@angular/core';
import { map as map$1 } from 'rxjs/operator/map';
import { pluck as pluck$1 } from 'rxjs/operator/pluck';
import { distinctUntilChanged as distinctUntilChanged$1 } from 'rxjs/operator/distinctUntilChanged';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgrxSelect {
    /**
     * @param {?} store
     * @return {?}
     */
    connect(store) {
        NgrxSelect.store = store;
    }
}
/**
 * \@internal
 */
NgrxSelect.store = undefined;
NgrxSelect.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgrxSelect.ctorParameters = () => [];
/**
 * @template T, K
 * @param {?=} pathOrMapFn
 * @param {...?} paths
 * @return {?}
 */
function Select(pathOrMapFn, ...paths) {
    return function (target, name) {
        let /** @type {?} */ mapped$;
        const /** @type {?} */ source$ = NgrxSelect.store;
        if (!source$) {
            throw new Error('NgrxSelect not connected to store!');
        }
        if (!pathOrMapFn) {
            pathOrMapFn = name;
        }
        if (typeof pathOrMapFn === 'string') {
            mapped$ = pluck$1.call(source$, pathOrMapFn, ...paths);
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = map$1.call(source$, pathOrMapFn);
        }
        else {
            throw new TypeError(`Unexpected type '${typeof pathOrMapFn}' in select operator,` + ` expected 'string' or 'function'`);
        }
        if (delete target[name]) {
            Object.defineProperty(target, name, {
                get: () => {
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
class NgrxUtilsModule {
}
NgrxUtilsModule.decorators = [
    { type: NgModule, args: [{
                providers: [NgrxSelect]
            },] },
];
/** @nocollapse */
NgrxUtilsModule.ctorParameters = () => [];

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
//# sourceMappingURL=store.js.map
