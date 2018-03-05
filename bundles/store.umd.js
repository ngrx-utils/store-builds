(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngrx/store'), require('rxjs/operators/pluck'), require('rxjs/Observable'), require('rxjs/operators/takeUntil')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@ngrx/store', 'rxjs/operators/pluck', 'rxjs/Observable', 'rxjs/operators/takeUntil'], factory) :
	(factory((global.ngrxUtils = global.ngrxUtils || {}, global.ngrxUtils.store = {}),global.ng.core,global.ngrx.store,global.pluck,global.Rx,global.takeUntil));
}(this, (function (exports,core,store,pluck,Observable,takeUntil) { 'use strict';

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
var NgrxSelectModule = /** @class */ (function () {
    /**
     * @param {?} ngrxSelect
     * @param {?} store
     * @param {?} module
     */
    function NgrxSelectModule(ngrxSelect, store$$1, module) {
        if (module) {
            throw new Error('Only import NgrxSelectModule to top level module like AppModule');
        }
        ngrxSelect.connect(store$$1);
    }
    return NgrxSelectModule;
}());
NgrxSelectModule.decorators = [
    { type: core.NgModule, args: [{
                providers: [NgrxSelect]
            },] },
];
/** @nocollapse */
NgrxSelectModule.ctorParameters = function () { return [
    { type: NgrxSelect, },
    { type: store.Store, },
    { type: NgrxSelectModule, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
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
    { type: core.NgModule, args: [{
                exports: [NgrxSelectModule]
            },] },
];
/** @nocollapse */
NgrxUtilsModule.ctorParameters = function () { return [
    { type: NgrxUtilsModule, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
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
                    return source$.pipe(pluck.pluck.apply(void 0, props));
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
                    var /** @type {?} */ source$ = NgrxSelect.store;
                    if (!source$) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return (_a = source$.select(mapFn)).pipe.apply(_a, operations);
                    var _a;
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
var WebWorkerService = /** @class */ (function () {
    function WebWorkerService() {
        this.workerFunctionToUrlMap = new WeakMap();
        this.promiseToWorkerMap = new WeakMap();
    }
    /**
     * @template T
     * @param {?} fn
     * @param {?=} data
     * @return {?}
     */
    WebWorkerService.prototype.run = function (fn, data) {
        var /** @type {?} */ url = this.getOrCreateWorkerUrl(fn);
        return this.runUrl(url, data);
    };
    /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    WebWorkerService.prototype.runUrl = function (url, data) {
        var /** @type {?} */ worker = new Worker(url);
        var /** @type {?} */ promise = this.createPromiseForWorker(worker, data);
        var /** @type {?} */ promiseCleaner = this.createPromiseCleaner(promise);
        this.promiseToWorkerMap.set(promise, worker);
        promise.then(promiseCleaner).catch(promiseCleaner);
        return promise;
    };
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebWorkerService.prototype.terminate = function (promise) {
        return this.removePromise(promise);
    };
    /**
     * @param {?} promise
     * @return {?}
     */
    WebWorkerService.prototype.getWorker = function (promise) {
        var /** @type {?} */ worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            return worker;
        }
        throw new Error('Could not find Worker for promise');
    };
    /**
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    WebWorkerService.prototype.createPromiseForWorker = function (worker, data) {
        return new Promise(function (resolve, reject) {
            worker.addEventListener('message', function (event) { return resolve(event.data); });
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        });
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebWorkerService.prototype.getOrCreateWorkerUrl = function (fn) {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            var /** @type {?} */ url = this.createWorkerUrl(fn);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return /** @type {?} */ ((this.workerFunctionToUrlMap.get(fn)));
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    WebWorkerService.prototype.createWorkerUrl = function (fn) {
        var /** @type {?} */ resolveString = fn.toString();
        var /** @type {?} */ webWorkerTemplate = "\n            self.addEventListener('message', function(e) {\n                postMessage((" + resolveString + ")(e.data));\n            });\n        ";
        var /** @type {?} */ blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    };
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebWorkerService.prototype.createPromiseCleaner = function (promise) {
        var _this = this;
        return function (event) {
            _this.removePromise(promise);
            return event;
        };
    };
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebWorkerService.prototype.removePromise = function (promise) {
        var /** @type {?} */ worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            worker.terminate();
        }
        this.promiseToWorkerMap.delete(promise);
        return promise;
    };
    return WebWorkerService;
}());
WebWorkerService.decorators = [
    { type: core.Injectable },
];
/** @nocollapse */
WebWorkerService.ctorParameters = function () { return []; };
var WebWorkerModule = /** @class */ (function () {
    function WebWorkerModule() {
    }
    return WebWorkerModule;
}());
WebWorkerModule.decorators = [
    { type: core.NgModule, args: [{
                providers: [WebWorkerService]
            },] },
];
/** @nocollapse */
WebWorkerModule.ctorParameters = function () { return []; };
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
    return pluck.pluck.apply(void 0, props);
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
    return takeUntil.takeUntil(component[destroy$]);
};
/**
 * \@internal
 * @param {?} component
 * @return {?}
 */
function addDestroyObservableToComponent(component) {
    component[destroy$] = new Observable.Observable(function (observer) {
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
    { type: core.Directive, args: [{
                selector: '[ngLet]'
            },] },
];
/** @nocollapse */
NgLetDirective.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
    { type: core.TemplateRef, },
]; };
NgLetDirective.propDecorators = {
    "ngLet": [{ type: core.Input },],
};
var NgLetModule = /** @class */ (function () {
    function NgLetModule() {
    }
    return NgLetModule;
}());
NgLetModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [NgLetDirective],
                exports: [NgLetDirective]
            },] },
];
/** @nocollapse */
NgLetModule.ctorParameters = function () { return []; };

exports.Select = Select;
exports.Pluck = Pluck;
exports.NgrxSelectModule = NgrxSelectModule;
exports.Dispatch = Dispatch;
exports.NgrxUtilsModule = NgrxUtilsModule;
exports.WebWorkerService = WebWorkerService;
exports.WebWorkerModule = WebWorkerModule;
exports.untilDestroy = untilDestroy;
exports.pluck = pluck$1;
exports.NgLetDirective = NgLetDirective;
exports.NgLetModule = NgLetModule;
exports.ɵa = NgrxSelect;
exports.ɵb = NgLetContext;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=store.umd.js.map
