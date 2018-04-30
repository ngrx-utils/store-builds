import { ElementRef, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
export interface MatchExp {
    [classes: string]: string;
}
export declare class RouterLinkMatch implements OnDestroy, OnChanges {
    private _renderer;
    private _ngEl;
    private _curRoute;
    private _matchExp;
    private _onChangesHook;
    routerLinkMatch: MatchExp;
    constructor(router: Router, _renderer: Renderer2, _ngEl: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    private _updateClass(v);
    private _toggleClass(classes, enabled);
    ngOnDestroy(): void;
}
export declare class RouterLinkMatchModule {
}
