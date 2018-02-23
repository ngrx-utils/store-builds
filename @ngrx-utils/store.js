import { NgModule, Injectable, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators/pluck';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators/takeUntil';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgrxSelect {
    /**
     * \@internal
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
    /**
     * \@internal
     * @param {?} ngrxSelect
     * @param {?} store
     */
    constructor(ngrxSelect, store) {
        ngrxSelect.connect(store);
    }
}
NgrxUtilsModule.decorators = [
    { type: NgModule, args: [{
                providers: [NgrxSelect]
            },] },
];
/** @nocollapse */
NgrxUtilsModule.ctorParameters = () => [
    { type: NgrxSelect, },
    { type: Store, },
];

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
function Pluck(path, ...paths) {
    return function (target, name) {
        let /** @type {?} */ props;
        if (!path) {
            path = name;
        }
        if (typeof path !== 'string') {
            throw new TypeError(`Unexpected type '${typeof path}' in select operator,` + ` expected 'string'`);
        }
        props = paths.length ? [path, ...paths] : path.split('.');
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
                    return source$.pipe(pluck(...props));
                } }, descriptor));
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
                    return source$.select(mapFn).pipe(...operations);
                } }, descriptor));
        }
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class WebWorkerService {
    constructor() {
        this.workerFunctionToUrlMap = new WeakMap();
        this.promiseToWorkerMap = new WeakMap();
    }
    /**
     * @template T
     * @param {?} fn
     * @param {?=} data
     * @return {?}
     */
    run(fn, data) {
        const /** @type {?} */ url = this.getOrCreateWorkerUrl(fn);
        return this.runUrl(url, data);
    }
    /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    runUrl(url, data) {
        const /** @type {?} */ worker = new Worker(url);
        const /** @type {?} */ promise = this.createPromiseForWorker(worker, data);
        const /** @type {?} */ promiseCleaner = this.createPromiseCleaner(promise);
        this.promiseToWorkerMap.set(promise, worker);
        promise.then(promiseCleaner).catch(promiseCleaner);
        return promise;
    }
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    terminate(promise) {
        return this.removePromise(promise);
    }
    /**
     * @param {?} promise
     * @return {?}
     */
    getWorker(promise) {
        const /** @type {?} */ worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            return worker;
        }
        throw new Error('Could not find Worker for promise');
    }
    /**
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    createPromiseForWorker(worker, data) {
        return new Promise((resolve, reject) => {
            worker.addEventListener('message', event => resolve(event.data));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        });
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    getOrCreateWorkerUrl(fn) {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            const /** @type {?} */ url = this.createWorkerUrl(fn);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return /** @type {?} */ ((this.workerFunctionToUrlMap.get(fn)));
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    createWorkerUrl(fn) {
        const /** @type {?} */ resolveString = fn.toString();
        const /** @type {?} */ webWorkerTemplate = `
            self.addEventListener('message', function(e) {
                postMessage((${resolveString})(e.data));
            });
        `;
        const /** @type {?} */ blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    }
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    createPromiseCleaner(promise) {
        return event => {
            this.removePromise(promise);
            return event;
        };
    }
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    removePromise(promise) {
        const /** @type {?} */ worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            worker.terminate();
        }
        this.promiseToWorkerMap.delete(promise);
        return promise;
    }
}
WebWorkerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WebWorkerService.ctorParameters = () => [];
class WebWorkerModule {
}
WebWorkerModule.decorators = [
    { type: NgModule, args: [{
                providers: [WebWorkerService]
            },] },
];
/** @nocollapse */
WebWorkerModule.ctorParameters = () => [];

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
function pluck$1(...props) {
    return pluck(...props);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// create a symbol identify the observable I add to
// the component so it doesn't conflict with anything.
// I need this so I'm able to add the desired behaviour to the component.
const /** @type {?} */ destroy$ = Symbol('destroy$');
/**
 * An operator that takes until destroy it takes a components this a parameter
 * returns a pipeable RxJS operator.
 */
const /** @type {?} */ untilDestroy = (component) => {
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
    component[destroy$] = new Observable(observer => {
        // keep track of the original destroy function,
        // the user might do something in there
        const /** @type {?} */ orignalDestroy = component.ngOnDestroy;
        if (!orignalDestroy) {
            // Angular does not support dynamic added destroy methods
            // so make sure there is one.
            throw new Error('untilDestroy operator needs the component to have an ngOnDestroy method');
        }
        // replace the ngOndestroy
        component.ngOnDestroy = () => {
            // fire off the destroy observable
            observer.next();
            // complete the observable
            observer.complete();
            // and at last, call the original destroy
            orignalDestroy.call(component);
        };
        // return cleanup function.
        return (_) => (component[destroy$] = undefined);
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
class NgLetContext {
    constructor() {
        this.$implicit = null;
        this.ngLet = null;
    }
}
class NgLetDirective {
    /**
     * @param {?} _vcr
     * @param {?} _templateRef
     */
    constructor(_vcr, _templateRef) {
        this._context = new NgLetContext();
        _vcr.createEmbeddedView(_templateRef, this._context);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set ngLet(value) {
        this._context.$implicit = this._context.ngLet = value;
    }
}
NgLetDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngLet]'
            },] },
];
/** @nocollapse */
NgLetDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: TemplateRef, },
];
NgLetDirective.propDecorators = {
    "ngLet": [{ type: Input },],
};
class NgLetModule {
}
NgLetModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgLetDirective],
                exports: [NgLetDirective]
            },] },
];
/** @nocollapse */
NgLetModule.ctorParameters = () => [];

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

export { Select, Pluck, NgrxUtilsModule, WebWorkerService, WebWorkerModule, untilDestroy, pluck$1 as pluck, NgLetDirective, NgLetModule, NgrxSelect as ɵa, NgLetContext as ɵb };
//# sourceMappingURL=store.js.map
