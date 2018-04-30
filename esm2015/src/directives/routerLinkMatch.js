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
export class RouterLinkMatch {
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
export class RouterLinkMatchModule {
}
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
