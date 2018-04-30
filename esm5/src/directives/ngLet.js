/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
var NgLetContext = /** @class */ (function () {
    function NgLetContext() {
        this.$implicit = null;
        this.ngLet = null;
    }
    return NgLetContext;
}());
export { NgLetContext };
function NgLetContext_tsickle_Closure_declarations() {
    /** @type {?} */
    NgLetContext.prototype.$implicit;
    /** @type {?} */
    NgLetContext.prototype.ngLet;
}
var NgLetDirective = /** @class */ (function () {
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
export { NgLetDirective };
NgLetDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngLet]'
            },] },
];
/** @nocollapse */
NgLetDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: TemplateRef, },
]; };
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
var NgLetModule = /** @class */ (function () {
    function NgLetModule() {
    }
    return NgLetModule;
}());
export { NgLetModule };
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
