import { TemplateRef, ViewContainerRef } from '@angular/core';
export declare class NgLetContext {
    $implicit: any;
    ngLet: any;
}
export declare class NgLetDirective {
    private _context;
    ngLet: any;
    constructor(_vcr: ViewContainerRef, _templateRef: TemplateRef<NgLetContext>);
}
export declare class NgLetModule {
}
