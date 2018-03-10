import { OnDestroy, Renderer2, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
export interface MatchExp {
    [classes: string]: string;
}
export declare class RouterLinkActiveMatch implements OnDestroy, OnChanges {
    private _renderer;
    private _ngEl;
    private _curRoute;
    private _matchExp;
    private _onChangesHook;
    routerLinkActiveMatch: MatchExp;
    constructor(router: Router, _renderer: Renderer2, _ngEl: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    private _updateClass(v);
    private _toggleClass(classes, enabled);
    ngOnDestroy(): void;
}
export declare class RouterLinkActiveMatchModule {
}
