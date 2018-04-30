import * as tslib_1 from "tslib";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { pluck as plucker } from 'rxjs/operators';
/**
 * @template T, V
 * @param {...?} props
 * @return {?}
 */
export function pluck() {
    var props = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
    }
    return plucker.apply(void 0, tslib_1.__spread(props));
}
//# sourceMappingURL=pluck.js.map
