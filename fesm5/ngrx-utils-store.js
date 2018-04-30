import { Injectable, NgModule, Directive, Input, TemplateRef, ViewContainerRef, ChangeDetectorRef, Pipe, WrappedValue, ɵisObservable, ɵisPromise, ɵstringify, defineInjectable, Renderer2, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { __spread, __read } from 'tslib';
import { pluck, takeUntil, filter, map } from 'rxjs/operators';
import { Observable, combineLatest, Subject } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

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
NgrxSelect.store = null;
NgrxSelect.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */ NgrxSelect.ngInjectableDef = defineInjectable({ factory: function NgrxSelect_Factory() { return new NgrxSelect(); }, token: NgrxSelect, providedIn: "root" });
var NgrxSelectModule = /** @class */ (function () {
    /**
     * @param {?} ngrxSelect
     * @param {?} store
     */
    function NgrxSelectModule(ngrxSelect, store) {
        if (NgrxSelect.store === null) {
            ngrxSelect.connect(store);
        }
    }
    return NgrxSelectModule;
}());
NgrxSelectModule.decorators = [
    { type: NgModule },
];
/** @nocollapse */
NgrxSelectModule.ctorParameters = function () { return [
    { type: NgrxSelect, },
    { type: Store, },
]; };

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
        var /** @type {?} */ originalMethod = (descriptor.value);
        if (typeof originalMethod !== 'function') {
            throw new TypeError("Unexpected type " + typeof originalMethod + " of property " + propertyKey + ", " +
                "expected 'function'");
        }
        // editing the descriptor/value parameter
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var /** @type {?} */ source$ = NgrxSelect.store;
            if (source$ === null) {
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
function Pluck(path) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey) {
        var /** @type {?} */ props;
        if (path === undefined || path === '') {
            path = propertyKey;
        }
        if (typeof path !== 'string') {
            throw new TypeError("Unexpected type '" + typeof path + "' in pluck operator, expected 'string'");
        }
        props = paths.length ? __spread([path], paths) : path.split('.');
        /**
         * Get property descriptor for more precise define object property
         */
        var /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, Object.assign({}, descriptor, {
                get: function () {
                    var /** @type {?} */ source$ = NgrxSelect.store;
                    if (source$ === null) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return source$.pipe(pluck.apply(void 0, __spread(props)));
                }
            }));
        }
    };
}

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
                    if (store === null) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    var /** @type {?} */ source$ = store.select(mapFn);
                    return source$.pipe.apply(source$, __spread(operations));
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
        this._vcr = _vcr;
        this._templateRef = _templateRef;
        this._context = new NgLetContext();
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
    /**
     * @return {?}
     */
    NgLetDirective.prototype.ngOnInit = function () {
        this._vcr.createEmbeddedView(this._templateRef, this._context);
    };
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
        if (orignalDestroy == null) {
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
 * @template T, V
 * @param {...?} props
 * @return {?}
 */
function pluck$1() {
    var props = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
    }
    return pluck.apply(void 0, __spread(props));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var RouterLinkMatch = /** @class */ (function () {
    /**
     * @param {?} router
     * @param {?} _renderer
     * @param {?} _ngEl
     */
    function RouterLinkMatch(router, _renderer, _ngEl) {
        var _this = this;
        this._renderer = _renderer;
        this._ngEl = _ngEl;
        this._onChangesHook = new Subject();
        combineLatest(router.events, this._onChangesHook)
            .pipe(map(function (_a) {
            var _b = __read(_a, 1), e = _b[0];
            return e;
        }), filter(function (e) { return e instanceof NavigationEnd; }), untilDestroy(this))
            .subscribe(function (e) {
            _this._curRoute = ((e)).urlAfterRedirects;
            _this._updateClass(_this._matchExp);
        });
    }
    Object.defineProperty(RouterLinkMatch.prototype, "routerLinkMatch", {
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            if (v && typeof v === 'object') {
                this._matchExp = v;
            }
            else {
                throw new TypeError("Unexpected type '" + typeof v + "' of value for " +
                    "input of routerLinkMatch directive, expected 'object'");
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    RouterLinkMatch.prototype.ngOnChanges = function (changes) {
        if (changes['routerLinkMatch']) {
            this._onChangesHook.next(changes['routerLinkMatch'].currentValue);
        }
    };
    /**
     * @param {?} v
     * @return {?}
     */
    RouterLinkMatch.prototype._updateClass = function (v) {
        var _this = this;
        Object.keys(v).forEach(function (cls) {
            if (v[cls] && typeof v[cls] === 'string') {
                var /** @type {?} */ regexp = new RegExp(v[cls]);
                if (_this._curRoute.match(regexp)) {
                    _this._toggleClass(cls, true);
                }
                else {
                    _this._toggleClass(cls, false);
                }
            }
            else {
                throw new TypeError("Could not convert match value to Regular Expression. " +
                    ("Unexpected type '" + typeof v[cls] + "' for value of key '" + cls + "' ") +
                    "in routerLinkMatch directive match expression, expected 'non-empty string'");
            }
        });
    };
    /**
     * @param {?} classes
     * @param {?} enabled
     * @return {?}
     */
    RouterLinkMatch.prototype._toggleClass = function (classes, enabled) {
        var _this = this;
        classes = classes.trim();
        classes.split(/\s+/g).forEach(function (cls) {
            if (enabled) {
                _this._renderer.addClass(_this._ngEl.nativeElement, cls);
            }
            else {
                _this._renderer.removeClass(_this._ngEl.nativeElement, cls);
            }
        });
    };
    /**
     * @return {?}
     */
    RouterLinkMatch.prototype.ngOnDestroy = function () { };
    return RouterLinkMatch;
}());
RouterLinkMatch.decorators = [
    { type: Directive, args: [{
                selector: '[routerLinkMatch]'
            },] },
];
/** @nocollapse */
RouterLinkMatch.ctorParameters = function () { return [
    { type: Router, },
    { type: Renderer2, },
    { type: ElementRef, },
]; };
RouterLinkMatch.propDecorators = {
    "routerLinkMatch": [{ type: Input, args: ['routerLinkMatch',] },],
};
var RouterLinkMatchModule = /** @class */ (function () {
    function RouterLinkMatchModule() {
    }
    return RouterLinkMatchModule;
}());
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
    return Error("InvalidPipeArgument: '" + value + "' for pipe '" + ɵstringify(type) + "'");
}
var ObservableStrategy = /** @class */ (function () {
    function ObservableStrategy() {
    }
    /**
     * @param {?} async
     * @param {?} updateLatestValue
     * @return {?}
     */
    ObservableStrategy.prototype.createSubscription = function (async, updateLatestValue) {
        return async.subscribe({
            next: updateLatestValue,
            error: function (e) {
                throw e;
            }
        });
    };
    /**
     * @param {?} subscription
     * @return {?}
     */
    ObservableStrategy.prototype.dispose = function (subscription) {
        subscription.unsubscribe();
    };
    /**
     * @param {?} subscription
     * @return {?}
     */
    ObservableStrategy.prototype.onDestroy = function (subscription) {
        subscription.unsubscribe();
    };
    return ObservableStrategy;
}());
var PromiseStrategy = /** @class */ (function () {
    function PromiseStrategy() {
    }
    /**
     * @param {?} async
     * @param {?} updateLatestValue
     * @return {?}
     */
    PromiseStrategy.prototype.createSubscription = function (async, updateLatestValue) {
        return async.then(updateLatestValue, function (e) {
            throw e;
        });
    };
    /**
     * @param {?} subscription
     * @return {?}
     */
    PromiseStrategy.prototype.dispose = function (subscription) { };
    /**
     * @param {?} subscription
     * @return {?}
     */
    PromiseStrategy.prototype.onDestroy = function (subscription) { };
    return PromiseStrategy;
}());
var /** @type {?} */ _promiseStrategy = new PromiseStrategy();
var /** @type {?} */ _observableStrategy = new ObservableStrategy();
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
var PushPipe = /** @class */ (function () {
    /**
     * @param {?} _ref
     */
    function PushPipe(_ref) {
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
    PushPipe.prototype.transform = function (obj) {
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
    };
    /**
     * @return {?}
     */
    PushPipe.prototype.ngOnDestroy = function () {
        if (this._subscription !== null) {
            this._dispose();
        }
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    PushPipe.prototype._subscribe = function (obj) {
        var _this = this;
        this._obj = obj;
        this._strategy = this._selectStrategy(obj);
        this._subscription = this._strategy.createSubscription(obj, function (value) { return _this._updateLatestValue(obj, value); });
    };
    /**
     * @return {?}
     */
    PushPipe.prototype._dispose = function () {
        this._strategy.dispose(/** @type {?} */ ((this._subscription)));
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    PushPipe.prototype._selectStrategy = function (obj) {
        if (ɵisPromise(obj)) {
            return _promiseStrategy;
        }
        if (ɵisObservable(obj)) {
            return _observableStrategy;
        }
        throw invalidPipeArgumentError(PushPipe, obj);
    };
    /**
     * @param {?} async
     * @param {?} value
     * @return {?}
     */
    PushPipe.prototype._updateLatestValue = function (async, value) {
        if (async === this._obj) {
            this._latestValue = value;
            this._ref.detectChanges();
        }
    };
    return PushPipe;
}());
PushPipe.decorators = [
    { type: Pipe, args: [{ name: 'push', pure: false },] },
];
/** @nocollapse */
PushPipe.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
var PushPipeModule = /** @class */ (function () {
    function PushPipeModule() {
    }
    return PushPipeModule;
}());
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
