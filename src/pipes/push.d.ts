import { ChangeDetectorRef, OnDestroy, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '@angular/core';
export declare function invalidPipeArgumentError(type: Type<any>, value: Object): Error;
/**
 * @ngModule PushPipeModule
 * @description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * The `push` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `push` pipe will run change detection and it works
 * even when `zone` has been disabled. When the component gets destroyed,
 * the `push` pipe unsubscribes automatically to avoid potential memory leaks.
 *
 */
export declare class PushPipe implements PipeTransform, OnDestroy {
    private _ref;
    private _latestValue;
    private _latestReturnedValue;
    private _subscription;
    private _obj;
    private _strategy;
    constructor(_ref: ChangeDetectorRef);
    transform<T>(obj: null): null;
    transform<T>(obj: undefined): undefined;
    transform<T>(obj: Observable<T> | Promise<T> | null | undefined): T | null;
    ngOnDestroy(): void;
    private _subscribe(obj);
    private _dispose();
    private _selectStrategy(obj);
    private _updateLatestValue(async, value);
}
export declare class PushPipeModule {
}
