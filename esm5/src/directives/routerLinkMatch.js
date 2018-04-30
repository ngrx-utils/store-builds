import * as tslib_1 from "tslib";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input, NgModule, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { untilDestroy } from '../operators';
/**
 * @record
 */
export function MatchExp() { }
function MatchExp_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [classes: string]: string;
    */
}
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
            var _b = tslib_1.__read(_a, 1), e = _b[0];
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
export { RouterLinkMatch };
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
function RouterLinkMatch_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RouterLinkMatch.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RouterLinkMatch.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    RouterLinkMatch.propDecorators;
    /** @type {?} */
    RouterLinkMatch.prototype._curRoute;
    /** @type {?} */
    RouterLinkMatch.prototype._matchExp;
    /** @type {?} */
    RouterLinkMatch.prototype._onChangesHook;
    /** @type {?} */
    RouterLinkMatch.prototype._renderer;
    /** @type {?} */
    RouterLinkMatch.prototype._ngEl;
}
var RouterLinkMatchModule = /** @class */ (function () {
    function RouterLinkMatchModule() {
    }
    return RouterLinkMatchModule;
}());
export { RouterLinkMatchModule };
RouterLinkMatchModule.decorators = [
    { type: NgModule, args: [{
                declarations: [RouterLinkMatch],
                exports: [RouterLinkMatch]
            },] },
];
function RouterLinkMatchModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    RouterLinkMatchModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    RouterLinkMatchModule.ctorParameters;
}
//# sourceMappingURL=routerLinkMatch.js.map
