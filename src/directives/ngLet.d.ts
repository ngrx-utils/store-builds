import { TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
export declare class NgLetContext {
    $implicit: any;
    ngLet: any;
}
export declare class NgLetDirective implements OnInit {
    private _vcr;
    private _templateRef;
    private _context;
    ngLet: any;
    constructor(_vcr: ViewContainerRef, _templateRef: TemplateRef<NgLetContext>);
    ngOnInit(): void;
}
export declare class NgLetModule {
}
