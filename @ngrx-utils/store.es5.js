import { NgModule, Injectable } from '@angular/core';
import { select } from '@ngrx/store';
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
function Select(mapFn) {
    var operations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        operations[_i - 1] = arguments[_i];
    }
    return function (target, name) {
        if (typeof mapFn !== 'function') {
            throw new TypeError("Unexpected type '" + typeof mapFn + "' in select operator," + " expected 'function'");
        }
        if (delete target[name]) {
            Object.defineProperty(target, name, {
                get: function () {
                    var /** @type {?} */ source$ = NgrxSelect.store;
                    if (!source$) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return source$.pipe.apply(source$, [select(mapFn)].concat(operations));
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
/**
 * Provide an utility for select a piece of state from Root State.
 * Support shorthand syntax with 'dot' split property name and leave it empty
 * will use the component property name.
 * \@example
 * export class MyComponent {
 *   \@Select() prop1: Observable<any>
 *   \@Select('feature.prop2') prop2: Observable<any>
 *   \@Select('feature', 'prop3') prop3: Observable<any>
 * }
 * @template A, B
 * @param {?=} path
 * @param {...?} paths
 * @return {?}
 */
function Pluck(path) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return function (target, name) {
        var /** @type {?} */ fn;
        if (!path) {
            path = name;
        }
        if (typeof path !== 'string') {
            throw new TypeError("Unexpected type '" + typeof path + "' in select operator," + " expected 'string'");
        }
        fn = getPropFactory(paths.length ? [path].concat(paths) : path.split('.'));
        if (delete target[name]) {
            Object.defineProperty(target, name, {
                get: function () {
                    var /** @type {?} */ source$ = NgrxSelect.store;
                    if (!source$) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return source$.pipe(select(fn));
                },
                enumerable: true,
                configurable: true
            });
        }
    };
}
/**
 * @param {?} paths
 * @return {?}
 */
function getPropFactory(paths) {
    return function (state) { return paths.reduce(function (prev, cur) {
        return prev && prev[cur];
    }, state); };
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
//# sourceMappingURL=store.es5.js.map
