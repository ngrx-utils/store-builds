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
/**
 * \@internal
 */
NgrxSelect.selectorMap = {};
NgrxSelect.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
NgrxSelect.ctorParameters = function () { return []; };
/**
 * @param {?=} selectorOrFeature
 * @param {...?} paths
 * @return {?}
 */
function Select(selectorOrFeature) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return function (target, name) {
        var /** @type {?} */ fn;
        // Nothing here? Use property name as selector
        if (!selectorOrFeature) {
            selectorOrFeature = name;
        }
        // Handle string vs Selector<any, any>
        if (typeof selectorOrFeature === 'string') {
            var /** @type {?} */ propsArray = paths.length ? [selectorOrFeature].concat(paths) : selectorOrFeature.split('.');
            fn = getSelector(propsArray);
        }
        else {
            fn = selectorOrFeature;
        }
        // Redefine property
        if (delete target[name]) {
            Object.defineProperty(target, name, {
                get: function () {
                    // get connected store
                    var /** @type {?} */ store$$1 = NgrxSelect.store;
                    if (!store$$1) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return store$$1.select(fn);
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
function getSelector(paths) {
    var /** @type {?} */ selectorMap = NgrxSelect.selectorMap;
    var /** @type {?} */ key = paths.join('.');
    var /** @type {?} */ cachedSelector = selectorMap[key];
    if (cachedSelector)
        return cachedSelector;
    var featureName = paths[0], propNames = paths.slice(1);
    var /** @type {?} */ getFeature = store.createFeatureSelector(featureName);
    return (selectorMap[key] = propNames.reduce(function (selected, prop) { return store.createSelector(selected, function (state) { return state[prop]; }); }, getFeature));
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
