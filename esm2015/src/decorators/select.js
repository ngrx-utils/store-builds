/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgrxSelect } from './ngrx-select';
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
export function Select(mapFn, ...operations) {
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
                    if (store === null) {
                        throw new Error('NgrxSelect not connected to store!');
                    }
                    const /** @type {?} */ source$ = store.select(mapFn);
                    return source$.pipe(...operations);
                } }));
        }
    };
}
//# sourceMappingURL=select.js.map
