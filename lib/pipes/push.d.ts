import { ChangeDetectorRef, OnDestroy, PipeTransform } from '@angular/core';
import { Observable, SubscriptionLike } from 'rxjs';
export interface SubscriptionStrategy {
    createSubscription(async: Observable<any>, updateLatestValue: any): SubscriptionLike;
    dispose(subscription: SubscriptionLike): void;
    onDestroy(subscription: SubscriptionLike): void;
}
export declare class ObservableStrategy implements SubscriptionStrategy {
    createSubscription(async: Observable<any>, updateLatestValue: any): SubscriptionLike;
    dispose(subscription: SubscriptionLike): void;
    onDestroy(subscription: SubscriptionLike): void;
}
export declare const _observableStrategy: ObservableStrategy;
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
    transform<T>(obj: Observable<T> | null | undefined): T | null;
    ngOnDestroy(): void;
    private _subscribe(obj);
    private _dispose();
    private _updateLatestValue(async, value);
}
export declare class PushPipeModule {
}
