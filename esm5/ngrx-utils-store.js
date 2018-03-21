import { __spread, __read } from 'tslib';
import { NgModule, Injectable, SkipSelf, Optional, Directive, Input, TemplateRef, ViewContainerRef, Renderer2, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { pluck } from 'rxjs/operators/pluck';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators/filter';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { Subject } from 'rxjs/Subject';

var NgrxSelect = /** @class */ (function () {
    function NgrxSelect() {
    }
    NgrxSelect.prototype.connect = function (store) {
        NgrxSelect.store = store;
    };
    return NgrxSelect;
}());
NgrxSelect.store = undefined;
NgrxSelect.decorators = [
    { type: Injectable },
];
NgrxSelect.ctorParameters = function () { return []; };
var NgrxSelectModule = /** @class */ (function () {
    function NgrxSelectModule(ngrxSelect, store, module) {
        if (module) {
            throw new Error('Only import NgrxSelectModule to top level module like AppModule');
        }
        ngrxSelect.connect(store);
    }
    return NgrxSelectModule;
}());
NgrxSelectModule.decorators = [
    { type: NgModule, args: [{
                providers: [NgrxSelect]
            },] },
];
NgrxSelectModule.ctorParameters = function () { return [
    { type: NgrxSelect, },
    { type: Store, },
    { type: NgrxSelectModule, decorators: [{ type: SkipSelf }, { type: Optional },] },
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
    { type: NgModule, args: [{
                exports: [NgrxSelectModule]
            },] },
];
NgrxUtilsModule.ctorParameters = function () { return [
    { type: NgrxUtilsModule, decorators: [{ type: SkipSelf }, { type: Optional },] },
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
                    return source$.pipe(pluck.apply(void 0, __spread(props)));
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
                    var store = NgrxSelect.store;
                    if (!store) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    var source$ = store.select(mapFn);
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
    { type: Directive, args: [{
                selector: '[ngLet]'
            },] },
];
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
NgLetModule.ctorParameters = function () { return []; };
function pluck$1() {
    var props = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
    }
    return pluck.apply(void 0, __spread(props));
}
var destroy$ = Symbol('destroy$');
var untilDestroy = function (component) {
    if (component[destroy$] === undefined) {
        addDestroyObservableToComponent(component);
    }
    return takeUntil(component[destroy$]);
};
function addDestroyObservableToComponent(component) {
    component[destroy$] = new Observable(function (observer) {
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
    function RouterLinkActiveMatch(router, _renderer, _ngEl) {
        var _this = this;
        this._renderer = _renderer;
        this._ngEl = _ngEl;
        this._curRoute = '';
        this._matchExp = {};
        this._onChangesHook = new Subject();
        router.events
            .pipe(filter(function (e) { return e instanceof NavigationEnd; }), combineLatest(this._onChangesHook), untilDestroy(this))
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
    { type: Directive, args: [{
                selector: '[routerLinkActiveMatch]'
            },] },
];
RouterLinkActiveMatch.ctorParameters = function () { return [
    { type: Router, },
    { type: Renderer2, },
    { type: ElementRef, },
]; };
RouterLinkActiveMatch.propDecorators = {
    "routerLinkActiveMatch": [{ type: Input, args: ['routerLinkActiveMatch',] },],
};
var RouterLinkActiveMatchModule = /** @class */ (function () {
    function RouterLinkActiveMatchModule() {
    }
    return RouterLinkActiveMatchModule;
}());
RouterLinkActiveMatchModule.decorators = [
    { type: NgModule, args: [{
                declarations: [RouterLinkActiveMatch],
                exports: [RouterLinkActiveMatch]
            },] },
];
RouterLinkActiveMatchModule.ctorParameters = function () { return []; };

export { NgrxSelectModule, NgrxUtilsModule, Pluck, Select, Dispatch, NgLetDirective, NgLetModule, RouterLinkActiveMatchModule, RouterLinkActiveMatch, pluck$1 as pluck, untilDestroy };
//# sourceMappingURL=ngrx-utils-store.js.map
