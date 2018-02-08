import { OperatorFunction } from 'rxjs/interfaces';
/**
 * Strong typed pluck function to replace
 * rxjs/operators/pluck
 *
 * Accept max 4 properties name
 */
export declare function pluck<A, B extends keyof A>(s1: B): OperatorFunction<A, A[B]>;
export declare function pluck<A, B extends keyof A, C extends keyof A[B]>(s1: B, s2: C): OperatorFunction<A, A[B][C]>;
export declare function pluck<A, B extends keyof A, C extends keyof A[B], D extends keyof A[B][C]>(s1: B, s2: C, s3: D): OperatorFunction<A, A[B][C][D]>;
export declare function pluck<A, B extends keyof A, C extends keyof A[B], D extends keyof A[B][C], E extends keyof A[B][C][D]>(s1: B, s2: C, s3: D, s4: E): OperatorFunction<A, A[B][C][D][E]>;
export declare function pluck<A, B extends keyof A, C extends keyof A[B], D extends keyof A[B][C], E extends keyof A[B][C][D], F extends keyof A[B][C][D][E]>(s1: B, s2: C, s3: D, s4: E, s5: F): OperatorFunction<A, A[B][C][D][E][F]>;
export declare function pluck<A, B extends keyof A, C extends keyof A[B], D extends keyof A[B][C], E extends keyof A[B][C][D], F extends keyof A[B][C][D][E], G extends keyof A[B][C][D][E][F]>(s1: B, s2: C, s3: D, s4: E, s5: F, s6: G): OperatorFunction<A, A[B][C][D][E][F][G]>;
/**
 * Provide an utility for select a piece of state from Root State.
 * Support shorthand syntax with 'dot' split property name and leave it empty
 * will use the component property name.
 * @example
 * export class MyComponent {
 *   @Pluck() prop1: Observable<any>
 *   @Pluck('feature.prop2') prop2: Observable<any>
 *   @Pluck('feature', 'prop3') prop3: Observable<any>
 * }
 */
export declare function Pluck(path?: string, ...paths: string[]): (target: any, name: string) => void;
