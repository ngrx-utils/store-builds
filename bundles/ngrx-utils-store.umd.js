(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ngrx/store'), require('rxjs/operators/pluck'), require('rxjs/Observable'), require('rxjs/operators/takeUntil'), require('@angular/router'), require('rxjs/operators/filter'), require('rxjs/operators/combineLatest'), require('rxjs/Subject')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@ngrx/store', 'rxjs/operators/pluck', 'rxjs/Observable', 'rxjs/operators/takeUntil', '@angular/router', 'rxjs/operators/filter', 'rxjs/operators/combineLatest', 'rxjs/Subject'], factory) :
	(factory((global['ngrx-utils'] = global['ngrx-utils'] || {}, global['ngrx-utils'].store = {}),global.ng.core,global.ngrx.store,global.Rx.Observable.prototype,global.Rx,global.Rx.Observable.prototype,global.ng.router,global.Rx.Observable.prototype,global.Rx.Observable.prototype,global.Rx));
}(this, (function (exports,core,store,pluck,Observable,takeUntil,router,filter,combineLatest,Subject) { 'use strict';

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
    { type: core.Injectable },
];
NgrxSelect.ctorParameters = function () { return []; };
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
    { type: core.NgModule, args: [{
                providers: [NgrxSelect]
            },] },
];
NgrxSelectModule.ctorParameters = function () { return [
    { type: NgrxSelect, },
    { type: store.Store, },
    { type: NgrxSelectModule, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
]; };
var NgrxUtilsModule = /** @class */ (function () {
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
NgrxUtilsModule.ctorParameters = function () { return [
    { type: NgrxUtilsModule, decorators: [{ type: core.SkipSelf }, { type: core.Optional },] },
]; };
function Pluck(path) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey) {
        var props;
        if (!path) {
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
                    if (!source$) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return source$.pipe(pluck.pluck.apply(void 0, __spread(props)));
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
                    return source$.pipe.apply(source$, operations);
                }
            }));
        }
    };
}
function Dispatch() {
    return function (target, propertyKey, descriptor) {
        var originalMethod = descriptor.value;
        if (typeof originalMethod !== 'function') {
            throw new TypeError("Unexpected type " + typeof originalMethod + " of property " + propertyKey + ", expected 'function'");
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
NgLetModule.ctorParameters = function () { return []; };
function pluck$1() {
    var props = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
    }
    return pluck.pluck.apply(void 0, __spread(props));
}
var destroy$ = Symbol('destroy$');
var untilDestroy = function (component) {
    if (component[destroy$] === undefined) {
        addDestroyObservableToComponent(component);
    }
    return takeUntil.takeUntil(component[destroy$]);
};
function addDestroyObservableToComponent(component) {
    component[destroy$] = new Observable.Observable(function (observer) {
        var orignalDestroy = component.ngOnDestroy;
        if (!orignalDestroy) {
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
        this._curRoute = '';
        this._matchExp = {};
        this._onChangesHook = new Subject.Subject();
        router$$1.events
            .pipe(filter.filter(function (e) { return e instanceof router.NavigationEnd; }), combineLatest.combineLatest(this._onChangesHook), untilDestroy(this))
            .subscribe(function (_a) {
            var _b = __read(_a, 1), e = _b[0];
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
RouterLinkActiveMatchModule.ctorParameters = function () { return []; };

exports.NgrxSelectModule = NgrxSelectModule;
exports.NgrxUtilsModule = NgrxUtilsModule;
exports.Pluck = Pluck;
exports.Select = Select;
exports.Dispatch = Dispatch;
exports.NgLetDirective = NgLetDirective;
exports.NgLetModule = NgLetModule;
exports.RouterLinkActiveMatchModule = RouterLinkActiveMatchModule;
exports.RouterLinkActiveMatch = RouterLinkActiveMatch;
exports.pluck = pluck$1;
exports.untilDestroy = untilDestroy;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-utils-store.umd.js.map
