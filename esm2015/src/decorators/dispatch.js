/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgrxSelect } from './ngrx-select';
/**
 * \@whatItDoes Dispatch method returned action.
 * \@howToUse `\@Dispatch() componentMethod() { return new Action() }`
 * @return {?}
 */
export function Dispatch() {
    return function (target, propertyKey, descriptor) {
        const /** @type {?} */ originalMethod = /** @type {?} */ (descriptor.value);
        if (typeof originalMethod !== 'function') {
            throw new TypeError(`Unexpected type ${typeof originalMethod} of property ${propertyKey}, ` +
                `expected 'function'`);
        }
        // editing the descriptor/value parameter
        descriptor.value = function (...args) {
            const /** @type {?} */ source$ = NgrxSelect.store;
            if (source$ === null) {
                throw new Error('NgrxSelect not connected to store!');
            }
            // note usage of originalMethod here
            const /** @type {?} */ actions = originalMethod.apply(this, args);
            if (Array.isArray(actions)) {
                dispatch(source$, actions);
            }
            else {
                dispatch(source$, [actions]);
            }
            return actions;
        };
        // return edited descriptor as opposed to overwriting the descriptor
        return descriptor;
    };
}
/**
 * @template T
 * @param {?} source$
 * @param {?} actions
 * @return {?}
 */
export function dispatch(source$, actions) {
    actions.forEach(action => {
        if (typeof action !== 'object' || (typeof action === 'object' && !('type' in action))) {
            throw new TypeError(`Unexpected action in method return type, expected object of type 'Action'`);
        }
        source$.dispatch(action);
    });
}
//# sourceMappingURL=dispatch.js.map
