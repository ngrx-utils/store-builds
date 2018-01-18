import { Injectable, NgModule } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
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
NgrxSelect.store = undefined;
NgrxSelect.selectorMap = {};
NgrxSelect.decorators = [
    { type: Injectable },
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
        // Nothing here? Use propery name as selector
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
    var /** @type {?} */ getFeature = createFeatureSelector(featureName);
    return (selectorMap[key] = propNames.reduce(function (selected, prop) { return createSelector(selected, function (state) { return state[prop]; }); }, getFeature));
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
