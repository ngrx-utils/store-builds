/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
export class NgLetContext {
    constructor() {
        this.$implicit = null;
        this.ngLet = null;
    }
}
function NgLetContext_tsickle_Closure_declarations() {
    /** @type {?} */
    NgLetContext.prototype.$implicit;
    /** @type {?} */
    NgLetContext.prototype.ngLet;
}
export class NgLetDirective {
    /**
     * @param {?} _vcr
     * @param {?} _templateRef
     */
    constructor(_vcr, _templateRef) {
        this._vcr = _vcr;
        this._templateRef = _templateRef;
        this._context = new NgLetContext();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set ngLet(value) {
        this._context.$implicit = this._context.ngLet = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._vcr.createEmbeddedView(this._templateRef, this._context);
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
function NgLetDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgLetDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgLetDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NgLetDirective.propDecorators;
    /** @type {?} */
    NgLetDirective.prototype._context;
    /** @type {?} */
    NgLetDirective.prototype._vcr;
    /** @type {?} */
    NgLetDirective.prototype._templateRef;
}
export class NgLetModule {
}
NgLetModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgLetDirective],
                exports: [NgLetDirective]
            },] },
];
function NgLetModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgLetModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgLetModule.ctorParameters;
}
//# sourceMappingURL=ngLet.js.map
