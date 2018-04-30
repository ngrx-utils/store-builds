/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectorRef, NgModule, Pipe, WrappedValue, ɵisObservable as isObservable, ɵisPromise as isPromise } from '@angular/core';
import { ɵstringify as stringify } from '@angular/core';
/**
 * @param {?} type
 * @param {?} value
 * @return {?}
 */
export function invalidPipeArgumentError(type, value) {
    return Error("InvalidPipeArgument: '" + value + "' for pipe '" + stringify(type) + "'");
}
/**
 * @record
 */
function SubscriptionStrategy() { }
function SubscriptionStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    SubscriptionStrategy.prototype.createSubscription;
    /** @type {?} */
    SubscriptionStrategy.prototype.dispose;
    /** @type {?} */
    SubscriptionStrategy.prototype.onDestroy;
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
        if (isPromise(obj)) {
            return _promiseStrategy;
        }
        if (isObservable(obj)) {
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
export { PushPipe };
PushPipe.decorators = [
    { type: Pipe, args: [{ name: 'push', pure: false },] },
];
/** @nocollapse */
PushPipe.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
function PushPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PushPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PushPipe.ctorParameters;
    /** @type {?} */
    PushPipe.prototype._latestValue;
    /** @type {?} */
    PushPipe.prototype._latestReturnedValue;
    /** @type {?} */
    PushPipe.prototype._subscription;
    /** @type {?} */
    PushPipe.prototype._obj;
    /** @type {?} */
    PushPipe.prototype._strategy;
    /** @type {?} */
    PushPipe.prototype._ref;
}
var PushPipeModule = /** @class */ (function () {
    function PushPipeModule() {
    }
    return PushPipeModule;
}());
export { PushPipeModule };
PushPipeModule.decorators = [
    { type: NgModule, args: [{
                exports: [PushPipe],
                declarations: [PushPipe]
            },] },
];
function PushPipeModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PushPipeModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PushPipeModule.ctorParameters;
}
//# sourceMappingURL=push.js.map
