import { Injectable, NgModule } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgrxSelect {
    /**
     * @param {?} store
     * @return {?}
     */
    connect(store$$1) {
        NgrxSelect.store = store$$1;
    }
}
/**
 * \@internal
 */
NgrxSelect.store = undefined;
/**
 * \@internal
 */
NgrxSelect.selectorMap = {};
NgrxSelect.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgrxSelect.ctorParameters = () => [];
/**
 * @param {?=} selectorOrFeature
 * @param {...?} paths
 * @return {?}
 */
function Select(selectorOrFeature, ...paths) {
    return function (target, name) {
        let /** @type {?} */ fn;
        // Nothing here? Use property name as selector
        if (!selectorOrFeature) {
            selectorOrFeature = name;
        }
        // Handle string vs Selector<any, any>
        if (typeof selectorOrFeature === 'string') {
            const /** @type {?} */ propsArray = paths.length ? [selectorOrFeature, ...paths] : selectorOrFeature.split('.');
            fn = getSelector(propsArray);
        }
        else {
            fn = selectorOrFeature;
        }
        // Redefine property
        if (delete target[name]) {
            Object.defineProperty(target, name, {
                get: () => {
                    // get connected store
                    const /** @type {?} */ store$$1 = NgrxSelect.store;
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
    const /** @type {?} */ selectorMap = NgrxSelect.selectorMap;
    const /** @type {?} */ key = paths.join('.');
    const /** @type {?} */ cachedSelector = selectorMap[key];
    if (cachedSelector)
        return cachedSelector;
    const [featureName, ...propNames] = paths;
    const /** @type {?} */ getFeature = createFeatureSelector(featureName);
    return (selectorMap[key] = propNames.reduce((selected, prop) => createSelector(selected, (state) => state[prop]), getFeature));
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
