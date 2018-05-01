(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngrx/store'), require('tslib'), require('rxjs/operators'), require('rxjs'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('@ngrx-utils/store', ['exports', '@angular/core', '@ngrx/store', 'tslib', 'rxjs/operators', 'rxjs', '@angular/router'], factory) :
    (factory((global['ngrx-utils'] = global['ngrx-utils'] || {}, global['ngrx-utils'].store = {}),global.ng.core,global.ngrx.store,global.tslib,global.Rx.Observable.prototype,global.rxjs,global.ng.router));
}(this, (function (exports,core,store,tslib,operators,rxjs,router) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgrxSelect = (function () {
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
    NgrxSelect.store = null;
    NgrxSelect.decorators = [
        { type: core.Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */ NgrxSelect.ngInjectableDef = core.defineInjectable({ factory: function NgrxSelect_Factory() { return new NgrxSelect(); }, token: NgrxSelect, providedIn: "root" });
    var NgrxSelectModule = (function () {
        /**
         * @param {?} ngrxSelect
         * @param {?} store
         */
        function NgrxSelectModule(ngrxSelect, store$$1) {
            if (NgrxSelect.store === null) {
                ngrxSelect.connect(store$$1);
            }
        }
        return NgrxSelectModule;
    }());
    NgrxSelectModule.decorators = [
        { type: core.NgModule },
    ];
    /** @nocollapse */
    NgrxSelectModule.ctorParameters = function () {
        return [
            { type: NgrxSelect, },
            { type: store.Store, },
        ];
    };
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
            props = paths.length ? tslib.__spread([path], paths) : path.split('.');
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
                        return source$.pipe(operators.pluck.apply(void 0, tslib.__spread(props)));
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
                        var /** @type {?} */ store$$1 = NgrxSelect.store;
                        if (store$$1 === null) {
                            throw new Error('NgrxSelect not connected to store!');
                        }
                        var /** @type {?} */ source$ = store$$1.select(mapFn);
                        return source$.pipe.apply(source$, tslib.__spread(operations));
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
    var NgLetContext = (function () {
        function NgLetContext() {
            this.$implicit = null;
            this.ngLet = null;
        }
        return NgLetContext;
    }());
    var NgLetDirective = (function () {
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
        { type: core.Directive, args: [{
                    selector: '[ngLet]'
                },] },
    ];
    /** @nocollapse */
    NgLetDirective.ctorParameters = function () {
        return [
            { type: core.ViewContainerRef, },
            { type: core.TemplateRef, },
        ];
    };
    NgLetDirective.propDecorators = {
        "ngLet": [{ type: core.Input },],
    };
    var NgLetModule = (function () {
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
        return operators.takeUntil(component[destroy$]);
    };
    /**
     * \@internal
     * @param {?} component
     * @return {?}
     */
    function addDestroyObservableToComponent(component) {
        component[destroy$] = new rxjs.Observable(function (observer) {
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
        return operators.pluck.apply(void 0, tslib.__spread(props));
    }
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var RouterLinkMatch = (function () {
        /**
         * @param {?} router
         * @param {?} _renderer
         * @param {?} _ngEl
         */
        function RouterLinkMatch(router$$1, _renderer, _ngEl) {
            var _this = this;
            this._renderer = _renderer;
            this._ngEl = _ngEl;
            this._onChangesHook = new rxjs.Subject();
            rxjs.combineLatest(router$$1.events, this._onChangesHook)
                .pipe(operators.map(function (_a) {
                var _b = tslib.__read(_a, 1), e = _b[0];
                return e;
            }), operators.filter(function (e) { return e instanceof router.NavigationEnd; }), untilDestroy(this))
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
        { type: core.Directive, args: [{
                    selector: '[routerLinkMatch]'
                },] },
    ];
    /** @nocollapse */
    RouterLinkMatch.ctorParameters = function () {
        return [
            { type: router.Router, },
            { type: core.Renderer2, },
            { type: core.ElementRef, },
        ];
    };
    RouterLinkMatch.propDecorators = {
        "routerLinkMatch": [{ type: core.Input, args: ['routerLinkMatch',] },],
    };
    var RouterLinkMatchModule = (function () {
        function RouterLinkMatchModule() {
        }
        return RouterLinkMatchModule;
    }());
    RouterLinkMatchModule.decorators = [
        { type: core.NgModule, args: [{
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
        return Error("InvalidPipeArgument: '" + value + "' for pipe '" + core.ɵstringify(type) + "'");
    }
    var ObservableStrategy = (function () {
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
        return ObservableStrategy;
    }());
    var PromiseStrategy = (function () {
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
    var PushPipe = (function () {
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
            return core.WrappedValue.wrap(this._latestValue);
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
            if (core.ɵisPromise(obj)) {
                return _promiseStrategy;
            }
            if (core.ɵisObservable(obj)) {
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
        { type: core.Pipe, args: [{ name: 'push', pure: false },] },
    ];
    /** @nocollapse */
    PushPipe.ctorParameters = function () {
        return [
            { type: core.ChangeDetectorRef, },
        ];
    };
    var PushPipeModule = (function () {
        function PushPipeModule() {
        }
        return PushPipeModule;
    }());
    PushPipeModule.decorators = [
        { type: core.NgModule, args: [{
                    exports: [PushPipe],
                    declarations: [PushPipe]
                },] },
    ];

    exports.NgrxSelectModule = NgrxSelectModule;
    exports.ɵNgrxSelect = NgrxSelect;
    exports.Dispatch = Dispatch;
    exports.dispatch = dispatch;
    exports.Pluck = Pluck;
    exports.Select = Select;
    exports.NgLetContext = NgLetContext;
    exports.NgLetDirective = NgLetDirective;
    exports.NgLetModule = NgLetModule;
    exports.RouterLinkMatch = RouterLinkMatch;
    exports.RouterLinkMatchModule = RouterLinkMatchModule;
    exports.untilDestroy = untilDestroy;
    exports.ɵdestroy$ = destroy$;
    exports.pluck = pluck$1;
    exports.invalidPipeArgumentError = invalidPipeArgumentError;
    exports.PushPipe = PushPipe;
    exports.PushPipeModule = PushPipeModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-utils-store.umd.js.map
