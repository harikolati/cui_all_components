import { Component, ContentChild, TemplateRef, Input } from '@angular/core';
var CuiGridComponent = (function () {
    function CuiGridComponent() {
    }
    CuiGridComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-grid',
                    template: "<div class=\"cards\"> <div class=\"card-container\" *ngFor=\"let data of cardData\"> <ng-container *ngTemplateOutlet=\"parentTemplate; context: { $implicit: data }\"> </ng-container> </div> </div> ",
                    styles: [".cards { max-width: 100%; width: 100%; display: grid; grid-gap: 20px; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-template-rows: auto; } .card-container { box-sizing: border-box; color: #58585b; background-color: #ffffff; font-family: CiscoSans, Arial, sans-serif; font-size: 12px; font-weight: 300; line-height: 21px; max-width: 100%; -webkit-font-smoothing: antialiased; border: 1px solid #dfdfdf; } "],
                },] },
    ];
    /** @nocollapse */
    CuiGridComponent.ctorParameters = function () { return []; };
    CuiGridComponent.propDecorators = {
        "parentTemplate": [{ type: ContentChild, args: [TemplateRef,] },],
        "cardData": [{ type: Input },],
    };
    return CuiGridComponent;
}());
export { CuiGridComponent };
//# sourceMappingURL=cui-grid.component.js.map