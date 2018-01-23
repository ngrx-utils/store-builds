(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/operator/map'), require('rxjs/operator/pluck'), require('rxjs/operator/distinctUntilChanged')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/operator/map', 'rxjs/operator/pluck', 'rxjs/operator/distinctUntilChanged'], factory) :
	(factory((global.ngrxUtils = global.ngrxUtils || {}, global.ngrxUtils.store = {}),global.ng.core,global.map,global.pluck,global.distinctUntilChanged));
}(this, (function (exports,core,map,pluck,distinctUntilChanged) { 'use strict';

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
    { type: core.Injectable },
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
            mapped$ = pluck.pluck.call.apply(pluck.pluck, [source$, pathOrMapFn].concat(paths));
        }
        else if (typeof pathOrMapFn === 'function') {
            mapped$ = map.map.call(source$, pathOrMapFn);
        }
        else {
            throw new TypeError("Unexpected type '" + typeof pathOrMapFn + "' in select operator," + " expected 'string' or 'function'");
        }
        if (delete target[name]) {
            Object.defineProperty(target, name, {
                get: function () {
                    return distinctUntilChanged.distinctUntilChanged.call(mapped$);
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
    { type: core.NgModule, args: [{
                providers: [NgrxSelect]
            },] },
];
/** @nocollapse */
NgrxUtilsModule.ctorParameters = function () { return []; };

exports.NgrxUtilsModule = NgrxUtilsModule;
exports.Select = Select;
exports.NgrxSelect = NgrxSelect;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=store.umd.js.map
