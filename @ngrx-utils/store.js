import { NgModule, Injectable } from '@angular/core';
import { select } from '@ngrx/store';

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
 * Select decorator act like pipe operator of Observable
 * except the first parameter is a selector to select a piece
 * of state from \@ngrx/store and you won't be able to subscribe to it
 * \@example
 * export class MyComponent {
 *   \@Select(fromStore.getAuth, take(1))
 *   isAuth: Observable<boolean>
 * }
 * @template A, B
 * @param {?} mapFn
 * @param {...?} operations
 * @return {?}
 */
function Select(mapFn, ...operations) {
    return function (target, name) {
        if (typeof mapFn !== 'function') {
            throw new TypeError(`Unexpected type '${typeof mapFn}' in select operator,` + ` expected 'function'`);
        }
        /**
         * Get property descriptor for more precise define object property
         */
        const /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(target, name);
        if (delete target[name]) {
            Object.defineProperty(target, name, Object.assign({ /**
                 * @return {?}
                 */
                get() {
                    const /** @type {?} */ source$ = NgrxSelect.store;
                    if (!source$) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return source$.pipe(select(mapFn), ...operations);
                } }, descriptor));
        }
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provide an utility for select a piece of state from Root State.
 * Support shorthand syntax with 'dot' split property name and leave it empty
 * will use the component property name.
 * \@example
 * export class MyComponent {
 *   \@Pluck() prop1: Observable<any>
 *   \@Pluck('feature.prop2') prop2: Observable<any>
 *   \@Pluck('feature', 'prop3') prop3: Observable<any>
 * }
 * @template A, B
 * @param {?=} path
 * @param {...?} paths
 * @return {?}
 */
function Pluck(path, ...paths) {
    return function (target, name) {
        let /** @type {?} */ fn;
        if (!path) {
            path = name;
        }
        if (typeof path !== 'string') {
            throw new TypeError(`Unexpected type '${typeof path}' in select operator,` + ` expected 'string'`);
        }
        fn = getPropFactory(paths.length ? [path, ...paths] : path.split('.'));
        /**
         * Get property descriptor for more precise define object property
         */
        const /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(target, name);
        if (delete target[name]) {
            Object.defineProperty(target, name, Object.assign({ /**
                 * @return {?}
                 */
                get() {
                    const /** @type {?} */ source$ = NgrxSelect.store;
                    if (!source$) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return source$.pipe(select(fn));
                } }, descriptor));
        }
    };
}
/**
 * @param {?} paths
 * @return {?}
 */
function getPropFactory(paths) {
    return (state) => paths.reduce((prev, cur) => {
        return prev && prev[cur];
    }, state);
}

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

export { NgrxUtilsModule, NgrxSelect, Select, Pluck };
//# sourceMappingURL=store.js.map
