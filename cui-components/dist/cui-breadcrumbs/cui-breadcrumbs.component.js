import { Component, Input } from '@angular/core';
var CuiBreadcrumbsComponent = (function () {
    function CuiBreadcrumbsComponent() {
    }
    CuiBreadcrumbsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-breadcrumbs',
                    template: "<ul class=\"breadcrumb\"> <li *ngFor=\"let item of items\"> <a *ngIf=\"item.href\" [href]=\"item.href\">{{item.label}}</a> <a *ngIf=\"item.routerUrl && !item.href\" [routerLink]=\"item.routerUrl\">{{item.label}}</a> <a *ngIf=\"item.onClick && !item.href && !item.routerUrl\" (click)=\"item.onClick()\">{{item.label}}</a> <span *ngIf=\"!item.onClick && !item.href && !item.routerUrl\">{{item.label}}</span> </li> </ul>",
                },] },
    ];
    /** @nocollapse */
    CuiBreadcrumbsComponent.ctorParameters = function () { return []; };
    CuiBreadcrumbsComponent.propDecorators = {
        "items": [{ type: Input },],
    };
    return CuiBreadcrumbsComponent;
}());
export { CuiBreadcrumbsComponent };
//# sourceMappingURL=cui-breadcrumbs.component.js.map