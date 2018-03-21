import { NgModule, Injectable, SkipSelf, Optional, Directive, Input, TemplateRef, ViewContainerRef, Renderer2, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators/pluck';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators/filter';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { Subject } from 'rxjs/Subject';

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
class NgrxSelectModule {
    /**
     * @param {?} ngrxSelect
     * @param {?} store
     * @param {?} module
     */
    constructor(ngrxSelect, store, module) {
        if (module) {
            throw new Error('Only import NgrxSelectModule to top level module like AppModule');
        }
        ngrxSelect.connect(store);
    }
}
NgrxSelectModule.decorators = [
    { type: NgModule, args: [{
                providers: [NgrxSelect]
            },] },
];
/** @nocollapse */
NgrxSelectModule.ctorParameters = () => [
    { type: NgrxSelect, },
    { type: Store, },
    { type: NgrxSelectModule, decorators: [{ type: SkipSelf }, { type: Optional },] },
];
class NgrxUtilsModule {
    /**
     * @param {?} module
     */
    constructor(module) {
        if (module) {
            throw new Error('Only import NgrxUtilsModule to top level module like AppModule');
        }
    }
}
NgrxUtilsModule.decorators = [
    { type: NgModule, args: [{
                exports: [NgrxSelectModule]
            },] },
];
/** @nocollapse */
NgrxUtilsModule.ctorParameters = () => [
    { type: NgrxUtilsModule, decorators: [{ type: SkipSelf }, { type: Optional },] },
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
    return function (target, propertyKey) {
        let /** @type {?} */ props;
        if (!path) {
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
                    if (!source$) {
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
                    if (!store) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    const /** @type {?} */ source$ = store.select(mapFn);
                    return source$.pipe.apply(source$, operations);
                } }));
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
        const /** @type {?} */ originalMethod = descriptor.value;
        if (typeof originalMethod !== 'function') {
            throw new TypeError(`Unexpected type ${typeof originalMethod} of property ${propertyKey}, expected 'function'`);
        }
        // editing the descriptor/value parameter
        descriptor.value = function (...args) {
            const /** @type {?} */ source$ = NgrxSelect.store;
            if (!source$) {
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
const destroy$ = Symbol('destroy$');
/**
 * An operator that takes until destroy it takes a components this a parameter
 * returns a pipeable RxJS operator.
 */
const untilDestroy = (component) => {
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
/**
 * @record
 */

class RouterLinkActiveMatch {
    /**
     * @param {?} router
     * @param {?} _renderer
     * @param {?} _ngEl
     */
    constructor(router, _renderer, _ngEl) {
        this._renderer = _renderer;
        this._ngEl = _ngEl;
        this._curRoute = '';
        this._matchExp = {};
        this._onChangesHook = new Subject();
        router.events
            .pipe(filter(e => e instanceof NavigationEnd), combineLatest(this._onChangesHook), untilDestroy(this))
            .subscribe(([e]) => {
            this._curRoute = (/** @type {?} */ (e)).urlAfterRedirects;
            this._updateClass(this._matchExp);
        });
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set routerLinkActiveMatch(v) {
        if (v && typeof v === 'object') {
            this._matchExp = v;
        }
        else {
            throw new TypeError(`Unexpected type '${typeof v}' of value for ` +
                `input of routerLinkActiveMatch directive, expected 'object'`);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['routerLinkActiveMatch']) {
            this._onChangesHook.next(changes['routerLinkActiveMatch'].currentValue);
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
                    `in routerLinkActiveMatch directive match expression, expected 'non-empty string'`);
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
RouterLinkActiveMatch.decorators = [
    { type: Directive, args: [{
                selector: '[routerLinkActiveMatch]'
            },] },
];
/** @nocollapse */
RouterLinkActiveMatch.ctorParameters = () => [
    { type: Router, },
    { type: Renderer2, },
    { type: ElementRef, },
];
RouterLinkActiveMatch.propDecorators = {
    "routerLinkActiveMatch": [{ type: Input, args: ['routerLinkActiveMatch',] },],
};
class RouterLinkActiveMatchModule {
}
RouterLinkActiveMatchModule.decorators = [
    { type: NgModule, args: [{
                declarations: [RouterLinkActiveMatch],
                exports: [RouterLinkActiveMatch]
            },] },
];
/** @nocollapse */
RouterLinkActiveMatchModule.ctorParameters = () => [];

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
/**
 * Generated bundle index. Do not edit.
 */

export { NgrxSelectModule, NgrxUtilsModule, Pluck, Select, Dispatch, NgLetDirective, NgLetModule, RouterLinkActiveMatchModule, RouterLinkActiveMatch, pluck$1 as pluck, untilDestroy };
//# sourceMappingURL=ngrx-utils-store.js.map
