import * as tslib_1 from "tslib";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { pluck as pluckOperator } from 'rxjs/operators';
import { NgrxSelect } from './ngrx-select';
/**
 * \@whatItDoes Provide an utility for select a piece of state from Root State.
 * \@howToUse `\@Pluck('state') state: Observable<any>`
 * \@description Support shorthand syntax with 'dot' split property name and leave it empty
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
export function Pluck(path) {
    var paths = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        paths[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey) {
        var /** @type {?} */ props;
        if (path === undefined || path === '') {
            path = propertyKey;
        }
        if (typeof path !== 'string') {
            throw new TypeError("Unexpected type '" + typeof path + "' in pluck operator, expected 'string'");
        }
        props = paths.length ? tslib_1.__spread([path], paths) : path.split('.');
        /**
         * Get property descriptor for more precise define object property
         */
        var /** @type {?} */ descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        if (delete target[propertyKey]) {
            Object.defineProperty(target, propertyKey, Object.assign({}, descriptor, {
                get: function () {
                    var /** @type {?} */ source$ = NgrxSelect.store;
                    if (source$ === null) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    return source$.pipe(pluckOperator.apply(void 0, tslib_1.__spread(props)));
                }
            }));
        }
    };
}
//# sourceMappingURL=pluck.js.map
