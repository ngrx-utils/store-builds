import { NgModule, Injectable, SkipSelf, Optional, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators/pluck';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators/takeUntil';
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgrxSelect = /** @class */ (function () {
    function NgrxSelect() {
    }
    /**
     * \@internal
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
var NgrxSelectModule = /** @class */ (function () {
    /**
     * @param {?} ngrxSelect
     * @param {?} store
     * @param {?} module
     */
    function NgrxSelectModule(ngrxSelect, store, module) {
        if (module) {
            throw new Error('Only import NgrxSelectModule to top level module like AppModule');
        }
        ngrxSelect.connect(store);
    }
    return NgrxSelectModule;
}());
NgrxSelectModule.decorators = [
    { type: NgModule, args: [{
                providers: [NgrxSelect]
            },] },
];
/** @nocollapse */
NgrxSelectModule.ctorParameters = function () { return [
    { type: NgrxSelect, },
    { type: Store, },
    { type: NgrxSelectModule, decorators: [{ type: SkipSelf }, { type: Optional },] },
]; };
var NgrxUtilsModule = /** @class */ (function () {
    /**
     * @param {?} module
     */
    function NgrxUtilsModule(module) {
        if (module) {
            throw new Error('Only import NgrxUtilsModule to top level module like AppModule');
        }
    }
    return NgrxUtilsModule;
}());
NgrxUtilsModule.decorators = [
    { type: NgModule, args: [{
                exports: [NgrxSelectModule]
            },] },
];
/** @nocollapse */
NgrxUtilsModule.ctorParameters = function () { return [
    { type: NgrxUtilsModule, decorators: [{ type: SkipSelf }, { type: Optional },] },
]; };
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
 * @param {?=} path
 * @param {...?} paths
 * @return {?}
 */
function Pluck(path) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey) {
        var /** @type {?} */ props;
        if (!path) {
            path = propertyKey;
        }
        if (typeof path !== 'string') {
            throw new TypeError("Unexpected type '" + typeof path + "' in pluck operator, expected 'string'");
        }
        props = paths.length ? [path].concat(paths) : path.split('.');
        /**
         * Get property descriptor for more precise define object property
         */
        var /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, Object.assign({}, descriptor, {
                get: function () {
                    var /** @type {?} */ source$ = NgrxSelect.store;
                    if (!source$) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return source$.pipe(pluck.apply(void 0, props));
                }
            }));
        }
    };
}
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
    return function (target, propertyKey) {
        if (typeof mapFn !== 'function') {
            throw new TypeError("Unexpected type '" + typeof mapFn + "' in select operator, expected 'function'");
        }
        /**
         * Get property descriptor for more precise define object property
         */
        var /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, Object.assign({}, descriptor, {
                get: function () {
                    var /** @type {?} */ store = NgrxSelect.store;
                    if (!store) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    var /** @type {?} */ source$ = store.select(mapFn);
                    return source$.pipe.apply(source$, operations);
                }
            }));
        }
    };
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @return {?}
 */
function Dispatch() {
    return function (target, propertyKey, descriptor) {
        var /** @type {?} */ originalMethod = descriptor.value;
        if (typeof originalMethod !== 'function') {
            throw new TypeError("Unexpected type " + typeof originalMethod + " of property " + propertyKey + ", expected 'function'");
        }
        // editing the descriptor/value parameter
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var /** @type {?} */ source$ = NgrxSelect.store;
            if (!source$) {
                throw new Error('NgrxSelect not connected to store!');
            }
            // note usage of originalMethod here
            var /** @type {?} */ actions = originalMethod.apply(this, args);
            if (Array.isArray(actions)) {
                dispatch(source$, actions);
            }
            else {
                dispatch(source$, [actions]);
            }
            return actions;
        };
        // return edited descriptor as opposed to overwriting the descriptor
        return descriptor;
    };
}
/**
 * @template T
 * @param {?} source$
 * @param {?} actions
 * @return {?}
 */
function dispatch(source$, actions) {
    actions.forEach(function (action) {
        if (typeof action !== 'object' || (typeof action === 'object' && !('type' in action))) {
            throw new TypeError("Unexpected action in method return type, expected object of type 'Action'");
        }
        source$.dispatch(action);
    });
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
 * @template T, V
 * @param {...?} props
 * @return {?}
 */
function pluck$1() {
    var props = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
    }
    return pluck.apply(void 0, props);
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// create a symbol identify the observable I add to
// the component so it doesn't conflict with anything.
// I need this so I'm able to add the desired behaviour to the component.
var /** @type {?} */ destroy$ = Symbol('destroy$');
/**
 * An operator that takes until destroy it takes a components this a parameter
 * returns a pipeable RxJS operator.
 */
var /** @type {?} */ untilDestroy = function (component) {
    if (component[destroy$] === undefined) {
        // only hookup each component once.
        addDestroyObservableToComponent(component);
    }
    // pipe in the takeUntil destroy$ and return the source unaltered
    return takeUntil(component[destroy$]);
};
/**
 * \@internal
 * @param {?} component
 * @return {?}
 */
function addDestroyObservableToComponent(component) {
    component[destroy$] = new Observable(function (observer) {
        // keep track of the original destroy function,
        // the user might do something in there
        var /** @type {?} */ orignalDestroy = component.ngOnDestroy;
        if (!orignalDestroy) {
            // Angular does not support dynamic added destroy methods
            // so make sure there is one.
            throw new Error('untilDestroy operator needs the component to have an ngOnDestroy method');
        }
        // replace the ngOndestroy
        component.ngOnDestroy = function () {
            // fire off the destroy observable
            observer.next();
            // complete the observable
            observer.complete();
            // and at last, call the original destroy
            orignalDestroy.call(component);
        };
        // return cleanup function.
        return function (_) { return (component[destroy$] = undefined); };
    });
}
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgLetContext = /** @class */ (function () {
    function NgLetContext() {
        this.$implicit = null;
        this.ngLet = null;
    }
    return NgLetContext;
}());
var NgLetDirective = /** @class */ (function () {
    /**
     * @param {?} _vcr
     * @param {?} _templateRef
     */
    function NgLetDirective(_vcr, _templateRef) {
        this._context = new NgLetContext();
        _vcr.createEmbeddedView(_templateRef, this._context);
    }
    Object.defineProperty(NgLetDirective.prototype, "ngLet", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this._context.$implicit = this._context.ngLet = value;
        },
        enumerable: true,
        configurable: true
    });
    return NgLetDirective;
}());
NgLetDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngLet]'
            },] },
];
/** @nocollapse */
NgLetDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: TemplateRef, },
]; };
NgLetDirective.propDecorators = {
    "ngLet": [{ type: Input },],
};
var NgLetModule = /** @class */ (function () {
    function NgLetModule() {
    }
    return NgLetModule;
}());
NgLetModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgLetDirective],
                exports: [NgLetDirective]
            },] },
];
/** @nocollapse */
NgLetModule.ctorParameters = function () { return []; };
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export { Select, Pluck, NgrxSelectModule, Dispatch, NgrxUtilsModule, untilDestroy, pluck$1 as pluck, NgLetDirective, NgLetModule, NgrxSelect as ɵa, NgLetContext as ɵb };
//# sourceMappingURL=store.es5.js.map
