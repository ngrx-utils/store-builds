(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngrx/store'), require('rxjs/operators'), require('rxjs'), require('@angular/router')) :
	typeof define === 'function' && define.amd ? define('@ngrx-utils/store', ['exports', '@angular/core', '@ngrx/store', 'rxjs/operators', 'rxjs', '@angular/router'], factory) :
	(factory((global['ngrx-utils'] = global['ngrx-utils'] || {}, global['ngrx-utils'].store = {}),global.ng.core,global.ngrx.store,global.Rx.Observable.prototype,global.rxjs,global.ng.router));
}(this, (function (exports,core,store,operators,rxjs,router) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */










function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var NgrxSelect = /** @class */ (function () {
    function NgrxSelect() {
    }
    NgrxSelect.prototype.connect = function (store$$1) {
        NgrxSelect.store = store$$1;
    };
    return NgrxSelect;
}());
NgrxSelect.store = undefined;
NgrxSelect.decorators = [
    { type: core.Injectable, args: [{
                providedIn: 'root'
            },] },
];
NgrxSelect.ngInjectableDef = core.defineInjectable({ factory: function NgrxSelect_Factory() { return new NgrxSelect(); }, token: NgrxSelect, providedIn: "root" });
var NgrxSelectModule = /** @class */ (function () {
    function NgrxSelectModule(ngrxSelect, store$$1, module) {
        if (module) {
            throw new Error('Only import NgrxSelectModule to top level module like AppModule');
        }
        ngrxSelect.connect(store$$1);
    }
    return NgrxSelectModule;
}());
NgrxSelectModule.decorators = [
    { type: core.NgModule },
];
NgrxSelectModule.ctorParameters = function () { return [
    { type: NgrxSelect, },
    { type: store.Store, },
    { type: NgrxSelectModule, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
]; };
function Pluck(path) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey) {
        var props;
        if (path === undefined || path === '') {
            path = propertyKey;
        }
        if (typeof path !== 'string') {
            throw new TypeError("Unexpected type '" + typeof path + "' in pluck operator, expected 'string'");
        }
        props = paths.length ? __spread([path], paths) : path.split('.');
        var descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, Object.assign({}, descriptor, {
                get: function () {
                    var source$ = NgrxSelect.store;
                    if (source$ === undefined) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return source$.pipe(operators.pluck.apply(void 0, __spread(props)));
                }
            }));
        }
    };
}
function Select(mapFn) {
    var operations = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        operations[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey) {
        if (typeof mapFn !== 'function') {
            throw new TypeError("Unexpected type '" + typeof mapFn + "' in select operator, expected 'function'");
        }
        var descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, Object.assign({}, descriptor, {
                get: function () {
                    var store$$1 = NgrxSelect.store;
                    if (!store$$1) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    var source$ = store$$1.select(mapFn);
                    return source$.pipe.apply(source$, __spread(operations));
                }
            }));
        }
    };
}
function Dispatch() {
    return function (target, propertyKey, descriptor) {
        var originalMethod = (descriptor.value);
        if (typeof originalMethod !== 'function') {
            throw new TypeError("Unexpected type " + typeof originalMethod + " of property " + propertyKey + ", " +
                "expected 'function'");
        }
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var source$ = NgrxSelect.store;
            if (!source$) {
                throw new Error('NgrxSelect not connected to store!');
            }
            var actions = originalMethod.apply(this, args);
            if (Array.isArray(actions)) {
                dispatch(source$, actions);
            }
            else {
                dispatch(source$, [actions]);
            }
            return actions;
        };
        return descriptor;
    };
}
function dispatch(source$, actions) {
    actions.forEach(function (action) {
        if (typeof action !== 'object' || (typeof action === 'object' && !('type' in action))) {
            throw new TypeError("Unexpected action in method return type, expected object of type 'Action'");
        }
        source$.dispatch(action);
    });
}
var NgLetContext = /** @class */ (function () {
    function NgLetContext() {
        this.$implicit = null;
        this.ngLet = null;
    }
    return NgLetContext;
}());
var NgLetDirective = /** @class */ (function () {
    function NgLetDirective(_vcr, _templateRef) {
        this._context = new NgLetContext();
        _vcr.createEmbeddedView(_templateRef, this._context);
    }
    Object.defineProperty(NgLetDirective.prototype, "ngLet", {
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
function pluck$1() {
    var props = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
    }
    return operators.pluck.apply(void 0, __spread(props));
}
var destroy$ = Symbol('destroy$');
var untilDestroy = function (component) {
    if (component[destroy$] === undefined) {
        addDestroyObservableToComponent(component);
    }
    return operators.takeUntil(component[destroy$]);
};
function addDestroyObservableToComponent(component) {
    component[destroy$] = new rxjs.Observable(function (observer) {
        var orignalDestroy = component.ngOnDestroy;
        if (orignalDestroy == null) {
            throw new Error('untilDestroy operator needs the component to have an ngOnDestroy method');
        }
        component.ngOnDestroy = function () {
            observer.next();
            observer.complete();
            orignalDestroy.call(component);
        };
        return function (_) { return (component[destroy$] = undefined); };
    });
}
var RouterLinkActiveMatch = /** @class */ (function () {
    function RouterLinkActiveMatch(router$$1, _renderer, _ngEl) {
        var _this = this;
        this._renderer = _renderer;
        this._ngEl = _ngEl;
        this._onChangesHook = new rxjs.Subject();
        rxjs.combineLatest(router$$1.events, this._onChangesHook)
            .pipe(operators.map(function (_a) {
            var _b = __read(_a, 1), e = _b[0];
            return e;
        }), operators.filter(function (e) { return e instanceof router.NavigationEnd; }), untilDestroy(this))
            .subscribe(function (e) {
            _this._curRoute = ((e)).urlAfterRedirects;
            _this._updateClass(_this._matchExp);
        });
    }
    Object.defineProperty(RouterLinkActiveMatch.prototype, "routerLinkActiveMatch", {
        set: function (v) {
            if (v && typeof v === 'object') {
                this._matchExp = v;
            }
            else {
                throw new TypeError("Unexpected type '" + typeof v + "' of value for " +
                    "input of routerLinkActiveMatch directive, expected 'object'");
            }
        },
        enumerable: true,
        configurable: true
    });
    RouterLinkActiveMatch.prototype.ngOnChanges = function (changes) {
        if (changes['routerLinkActiveMatch']) {
            this._onChangesHook.next(changes['routerLinkActiveMatch'].currentValue);
        }
    };
    RouterLinkActiveMatch.prototype._updateClass = function (v) {
        var _this = this;
        Object.keys(v).forEach(function (cls) {
            if (v[cls] && typeof v[cls] === 'string') {
                var regexp = new RegExp(v[cls]);
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
                    "in routerLinkActiveMatch directive match expression, expected 'non-empty string'");
            }
        });
    };
    RouterLinkActiveMatch.prototype._toggleClass = function (classes, enabled) {
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
    RouterLinkActiveMatch.prototype.ngOnDestroy = function () { };
    return RouterLinkActiveMatch;
}());
RouterLinkActiveMatch.decorators = [
    { type: core.Directive, args: [{
                selector: '[routerLinkActiveMatch]'
            },] },
];
RouterLinkActiveMatch.ctorParameters = function () { return [
    { type: router.Router, },
    { type: core.Renderer2, },
    { type: core.ElementRef, },
]; };
RouterLinkActiveMatch.propDecorators = {
    "routerLinkActiveMatch": [{ type: core.Input, args: ['routerLinkActiveMatch',] },],
};
var RouterLinkActiveMatchModule = /** @class */ (function () {
    function RouterLinkActiveMatchModule() {
    }
    return RouterLinkActiveMatchModule;
}());
RouterLinkActiveMatchModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [RouterLinkActiveMatch],
                exports: [RouterLinkActiveMatch]
            },] },
];
var ObservableStrategy = /** @class */ (function () {
    function ObservableStrategy() {
    }
    ObservableStrategy.prototype.createSubscription = function (async, updateLatestValue) {
        return async.subscribe({
            next: updateLatestValue,
            error: function (e) {
                throw e;
            }
        });
    };
    ObservableStrategy.prototype.dispose = function (subscription) {
        subscription.unsubscribe();
    };
    ObservableStrategy.prototype.onDestroy = function (subscription) {
        subscription.unsubscribe();
    };
    return ObservableStrategy;
}());
var _observableStrategy = new ObservableStrategy();
var PushPipe = /** @class */ (function () {
    function PushPipe(_ref) {
        this._ref = _ref;
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
        this._strategy = _observableStrategy;
    }
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
            return this.transform((obj));
        }
        if (this._latestValue === this._latestReturnedValue) {
            return this._latestReturnedValue;
        }
        this._latestReturnedValue = this._latestValue;
        return core.WrappedValue.wrap(this._latestValue);
    };
    PushPipe.prototype.ngOnDestroy = function () {
        if (this._subscription !== null) {
            this._dispose();
        }
    };
    PushPipe.prototype._subscribe = function (obj) {
        var _this = this;
        this._obj = obj;
        this._subscription = this._strategy.createSubscription(obj, function (value) { return _this._updateLatestValue(obj, value); });
    };
    PushPipe.prototype._dispose = function () {
        this._strategy.dispose(((this._subscription)));
        this._latestValue = null;
        this._latestReturnedValue = null;
        this._subscription = null;
        this._obj = null;
    };
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
PushPipe.ctorParameters = function () { return [
    { type: core.ChangeDetectorRef, },
]; };
var PushPipeModule = /** @class */ (function () {
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
exports.Pluck = Pluck;
exports.Select = Select;
exports.Dispatch = Dispatch;
exports.NgLetDirective = NgLetDirective;
exports.NgLetModule = NgLetModule;
exports.RouterLinkActiveMatchModule = RouterLinkActiveMatchModule;
exports.RouterLinkActiveMatch = RouterLinkActiveMatch;
exports.pluck = pluck$1;
exports.untilDestroy = untilDestroy;
exports.ɵdestroy$ = destroy$;
exports.PushPipe = PushPipe;
exports.PushPipeModule = PushPipeModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-utils-store.umd.js.map
