(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngrx/store')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@ngrx/store'], factory) :
	(factory((global.ngrxUtils = global.ngrxUtils || {}, global.ngrxUtils.store = {}),global.ng.core,global.ngrx.store));
}(this, (function (exports,core,store) { 'use strict';

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
    NgrxSelect.prototype.connect = function (store$$1) {
        NgrxSelect.store = store$$1;
    };
    return NgrxSelect;
}());
/**
 * \@internal
 */
NgrxSelect.store = undefined;
NgrxSelect.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
NgrxSelect.ctorParameters = function () { return []; };
var NgrxUtilsModule = /** @class */ (function () {
    function NgrxUtilsModule() {
    }
    return NgrxUtilsModule;
}());
NgrxUtilsModule.decorators = [
    { type: core.NgModule, args: [{
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
                    return source$.pipe.apply(source$, [store.select(mapFn)].concat(operations));
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
                    return source$.pipe(store.select(fn));
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

exports.NgrxUtilsModule = NgrxUtilsModule;
exports.NgrxSelect = NgrxSelect;
exports.Select = Select;
exports.Pluck = Pluck;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=store.umd.js.map
