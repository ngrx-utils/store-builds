import { Injectable, NgModule, Directive, Input, TemplateRef, ViewContainerRef, ElementRef, Renderer2, ChangeDetectorRef, Pipe, WrappedValue, ɵisObservable, ɵisPromise, ɵstringify, defineInjectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { pluck, takeUntil, filter, map } from 'rxjs/operators';
import { Observable, combineLatest, Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

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
NgrxSelect.store = null;
NgrxSelect.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */ NgrxSelect.ngInjectableDef = defineInjectable({ factory: function NgrxSelect_Factory() { return new NgrxSelect(); }, token: NgrxSelect, providedIn: "root" });
class NgrxSelectModule {
    /**
     * @param {?} ngrxSelect
     * @param {?} store
     */
    constructor(ngrxSelect, store) {
        if (NgrxSelect.store === null) {
            ngrxSelect.connect(store);
        }
    }
}
NgrxSelectModule.decorators = [
    { type: NgModule },
];
/** @nocollapse */
NgrxSelectModule.ctorParameters = () => [
    { type: NgrxSelect, },
    { type: Store, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@whatItDoes Dispatch method returned action.
 * \@howToUse `\@Dispatch() componentMethod() { return new Action() }`
 * @return {?}
 */
function Dispatch() {
    return function (target, propertyKey, descriptor) {
        const /** @type {?} */ originalMethod = /** @type {?} */ (descriptor.value);
        if (typeof originalMethod !== 'function') {
            throw new TypeError(`Unexpected type ${typeof originalMethod} of property ${propertyKey}, ` +
                `expected 'function'`);
        }
        // editing the descriptor/value parameter
        descriptor.value = function (...args) {
            const /** @type {?} */ source$ = NgrxSelect.store;
            if (source$ === null) {
                throw new Error('NgrxSelect not connected to store!');
            }
            // note usage of originalMethod here
            const /** @type {?} */ actions = originalMethod.apply(this, args);
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
    actions.forEach(action => {
        if (typeof action !== 'object' || (typeof action === 'object' && !('type' in action))) {
            throw new TypeError(`Unexpected action in method return type, expected object of type 'Action'`);
        }
        source$.dispatch(action);
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@whatItDoes Provide an utility for select a piece of state from Root State.
 * \@howToUse `\@Pluck('state') state: Observable<any>`
 * \@description Support shorthand syntax with 'dot' split property name and leave it empty
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
    return function (target, propertyKey) {
        let /** @type {?} */ props;
        if (path === undefined || path === '') {
            path = propertyKey;
        }
        if (typeof path !== 'string') {
            throw new TypeError(`Unexpected type '${typeof path}' in pluck operator, expected 'string'`);
        }
        props = paths.length ? [path, ...paths] : path.split('.');
        /**
         * Get property descriptor for more precise define object property
         */
        const /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, Object.assign({}, descriptor, { /**
                 * @return {?}
                 */
                get() {
                    const /** @type {?} */ source$ = NgrxSelect.store;
                    if (source$ === null) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return source$.pipe(pluck(...props));
                } }));
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
    return function (target, propertyKey) {
        if (typeof mapFn !== 'function') {
            throw new TypeError(`Unexpected type '${typeof mapFn}' in select operator, expected 'function'`);
        }
        /**
         * Get property descriptor for more precise define object property
         */
        const /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, Object.assign({}, descriptor, { /**
                 * @return {?}
                 */
                get() {
                    const /** @type {?} */ store = NgrxSelect.store;
                    if (store === null) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    const /** @type {?} */ source$ = store.select(mapFn);
                    return source$.pipe(...operations);
                } }));
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
        this._vcr = _vcr;
        this._templateRef = _templateRef;
        this._context = new NgLetContext();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set ngLet(value) {
        this._context.$implicit = this._context.ngLet = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._vcr.createEmbeddedView(this._templateRef, this._context);
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
        if (orignalDestroy == null) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RouterLinkMatch {
    /**
     * @param {?} router
     * @param {?} _renderer
     * @param {?} _ngEl
     */
    constructor(router, _renderer, _ngEl) {
        this._renderer = _renderer;
        this._ngEl = _ngEl;
        this._onChangesHook = new Subject();
        combineLatest(router.events, this._onChangesHook)
            .pipe(map(([e]) => e), filter(e => e instanceof NavigationEnd), untilDestroy(this))
            .subscribe(e => {
            this._curRoute = (/** @type {?} */ (e)).urlAfterRedirects;
            this._updateClass(this._matchExp);
        });
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set routerLinkMatch(v) {
        if (v && typeof v === 'object') {
            this._matchExp = v;
        }
        else {
            throw new TypeError(`Unexpected type '${typeof v}' of value for ` +
                `input of routerLinkMatch directive, expected 'object'`);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['routerLinkMatch']) {
            this._onChangesHook.next(changes['routerLinkMatch'].currentValue);
        }
    }
    /**
     * @param {?} v
     * @return {?}
     */
    _updateClass(v) {
        Object.keys(v).forEach(cls => {
            if (v[cls] && typeof v[cls] === 'string') {
                const /** @type {?} */ regexp = new RegExp(v[cls]);
                if (this._curRoute.match(regexp)) {
                    this._toggleClass(cls, true);
                }
                else {
                    this._toggleClass(cls, false);
                }
            }
            else {
                throw new TypeError(`Could not convert match value to Regular Expression. ` +
                    `Unexpected type '${typeof v[cls]}' for value of key '${cls}' ` +
                    `in routerLinkMatch directive match expression, expected 'non-empty string'`);
            }
        });
    }
    /**
     * @param {?} classes
     * @param {?} enabled
     * @return {?}
     */
    _toggleClass(classes, enabled) {
        classes = classes.trim();
        classes.split(/\s+/g).forEach(cls => {
            if (enabled) {
                this._renderer.addClass(this._ngEl.nativeElement, cls);
            }
            else {
                this._renderer.removeClass(this._ngEl.nativeElement, cls);
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() { }
}
RouterLinkMatch.decorators = [
    { type: Directive, args: [{
                selector: '[routerLinkMatch]'
            },] },
];
/** @nocollapse */
RouterLinkMatch.ctorParameters = () => [
    { type: Router, },
    { type: Renderer2, },
    { type: ElementRef, },
];
RouterLinkMatch.propDecorators = {
    "routerLinkMatch": [{ type: Input, args: ['routerLinkMatch',] },],
};
class RouterLinkMatchModule {
}
RouterLinkMatchModule.decorators = [
    { type: NgModule, args: [{
                declarations: [RouterLinkMatch],
                exports: [RouterLinkMatch]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} type
 * @param {?} value
 * @return {?}
 */
function invalidPipeArgumentError(type, value) {
    return Error(`InvalidPipeArgument: '${value}' for pipe '${ɵstringify(type)}'`);
}
class ObservableStrategy {
    /**
     * @param {?} async
     * @param {?} updateLatestValue
     * @return {?}
     */
    createSubscription(async, updateLatestValue) {
        return async.subscribe({
            next: updateLatestValue,
            error: (e) => {
                throw e;
            }
        });
    }
    /**
     * @param {?} subscription
     * @return {?}
     */
    dispose(subscription) {
        subscription.unsubscribe();
    }
}
class PromiseStrategy {
    /**
     * @param {?} async
     * @param {?} updateLatestValue
     * @return {?}
     */
    createSubscription(async, updateLatestValue) {
        return async.then(updateLatestValue, e => {
            throw e;
        });
    }
    /**
     * @param {?} subscription
     * @return {?}
     */
    dispose(subscription) { }
}
const /** @type {?} */ _promiseStrategy = new PromiseStrategy();
const /** @type {?} */ _observableStrategy = new ObservableStrategy();
/**
 * \@ngModule PushPipeModule
 * \@description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * The `push` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `push` pipe will run change detection and it works
 * even when `zone` has been disabled. When the component gets destroyed,
 * the `push` pipe unsubscribes automatically to avoid potential memory leaks.
 *
 */
class PushPipe {
    /**
     * @param {?} _ref
     */
    constructor(_ref) {
        this._ref = _ref;
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
        this._strategy = /** @type {?} */ ((null));
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    transform(obj) {
        if (this._obj === null) {
            if (obj != null) {
                this._subscribe(obj);
            }
            this._latestReturnedValue = this._latestValue;
            return this._latestValue;
        }
        if (obj !== this._obj) {
            this._dispose();
            return this.transform(/** @type {?} */ (obj));
        }
        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        }
        this._latestReturnedValue = this._latestValue;
        return WrappedValue.wrap(this._latestValue);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._subscription !== null) {
            this._dispose();
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    _subscribe(obj) {
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, (value) => this._updateLatestValue(obj, value));
    }
    /**
     * @return {?}
     */
    _dispose() {
        this._strategy.dispose(/** @type {?} */ ((this._subscription)));
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    _selectStrategy(obj) {
        if (ɵisPromise(obj)) {
            return _promiseStrategy;
        }
        if (ɵisObservable(obj)) {
            return _observableStrategy;
        }
        throw invalidPipeArgumentError(PushPipe, obj);
    }
    /**
     * @param {?} async
     * @param {?} value
     * @return {?}
     */
    _updateLatestValue(async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.detectChanges();
        }
    }
}
PushPipe.decorators = [
    { type: Pipe, args: [{ name: 'push', pure: false },] },
];
/** @nocollapse */
PushPipe.ctorParameters = () => [
    { type: ChangeDetectorRef, },
];
class PushPipeModule {
}
PushPipeModule.decorators = [
    { type: NgModule, args: [{
                exports: [PushPipe],
                declarations: [PushPipe]
            },] },
];

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

export { NgrxSelectModule, NgrxSelect as ɵNgrxSelect, Dispatch, dispatch, Pluck, Select, NgLetContext, NgLetDirective, NgLetModule, RouterLinkMatch, RouterLinkMatchModule, untilDestroy, destroy$ as ɵdestroy$, pluck$1 as pluck, invalidPipeArgumentError, PushPipe, PushPipeModule };
//# sourceMappingURL=ngrx-utils-store.js.map
