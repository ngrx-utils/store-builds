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
    return Error(`InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'`);
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
export class PushPipe {
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
        if (isPromise(obj)) {
            return _promiseStrategy;
        }
        if (isObservable(obj)) {
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
export class PushPipeModule {
}
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
