import { Selector } from '@ngrx/store';
import { OperatorFunction } from 'rxjs/interfaces';
export declare function Select<A, B>(mapFn: Selector<A, B>): (target: any, name: string) => void;
export declare function Select<A, B, C>(mapFn: Selector<A, B>, op1: OperatorFunction<B, C>): (target: any, name: string) => void;
export declare function Select<A, B, C, D>(mapFn: Selector<A, B>, op1: OperatorFunction<B, C>, op2: OperatorFunction<C, D>): (target: any, name: string) => void;
export declare function Select<A, B, C, D, E>(mapFn: (state: A) => B, op1: OperatorFunction<B, C>, op2: OperatorFunction<C, D>, op3: OperatorFunction<D, E>): (target: any, name: string) => void;
export declare function Select<A, B, C, D, E, F>(mapFn: Selector<A, B>, op1: OperatorFunction<B, C>, op2: OperatorFunction<C, D>, op3: OperatorFunction<D, E>, op4: OperatorFunction<E, F>): (target: any, name: string) => void;
export declare function Select<A, B, C, D, E, F, G>(mapFn: Selector<A, B>, op1: OperatorFunction<B, C>, op2: OperatorFunction<C, D>, op3: OperatorFunction<D, E>, op4: OperatorFunction<E, F>, op5: OperatorFunction<F, G>): (target: any, name: string) => void;
export declare function Select<A, B, C, D, E, F, G, H>(mapFn: Selector<A, B>, op1: OperatorFunction<B, C>, op2: OperatorFunction<C, D>, op3: OperatorFunction<D, E>, op4: OperatorFunction<E, F>, op5: OperatorFunction<F, G>, op6: OperatorFunction<G, H>): (target: any, name: string) => void;
export declare function Select<A, B, C, D, E, F, G, H, I>(mapFn: Selector<A, B>, op1: OperatorFunction<B, C>, op2: OperatorFunction<C, D>, op3: OperatorFunction<D, E>, op4: OperatorFunction<E, F>, op5: OperatorFunction<F, G>, op6: OperatorFunction<G, H>, op7: OperatorFunction<H, I>): (target: any, name: string) => void;
export declare function Select<A, B, C, D, E, F, G, H, I, J>(mapFn: Selector<A, B>, op1: OperatorFunction<B, C>, op2: OperatorFunction<C, D>, op3: OperatorFunction<D, E>, op4: OperatorFunction<E, F>, op5: OperatorFunction<F, G>, op6: OperatorFunction<G, H>, op7: OperatorFunction<H, I>, op8: OperatorFunction<I, J>): (target: any, name: string) => void;