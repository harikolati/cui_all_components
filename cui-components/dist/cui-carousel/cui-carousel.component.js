import { Component, Input } from '@angular/core';
var CuiCarouselComponent = (function () {
    function CuiCarouselComponent() {
        this.items = [];
        this.indigo = false;
        this.itemIndex = 0;
    }
    CuiCarouselComponent.prototype.gotoIndex = function (_index) {
        var index = _index;
        if (index >= this.items.length) {
            index = this.items.length - 1;
        }
        if (index < 0) {
            index = 0;
        }
        this.itemIndex = index;
    };
    CuiCarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-carousel',
                    template: "<div class=\"carousel\" [ngClass]=\"{'carousel--indigo': indigo}\"> <span *ngFor=\"let item of items;let i = index\"> <span *ngIf=\"i === itemIndex\"> <ng-container *ngTemplateOutlet=\"item; context: {data: data}\"></ng-container> </span> </span> <div class=\"base-margin-top\"> <div class=\"carousel__controls\"> <a class=\"back\" [ngClass]=\"{disabled: itemIndex <= 0}\" (click)=\"gotoIndex(itemIndex - 1)\"> <span class=\"icon-chevron-left\"></span> </a> <a *ngFor=\"let dot of items;let i = index\" class=\"dot\" [ngClass]=\"{selected: i === itemIndex}\" (click)=\"gotoIndex(i)\"> <span class=\"icon-circle\"></span> </a> <a class=\"next\" [ngClass]=\"{disabled: itemIndex >= items.length - 1}\" (click)=\"gotoIndex(itemIndex + 1)\"> <span class=\"icon-chevron-right\"></span> </a> </div> </div> </div>",
                },] },
    ];
    /** @nocollapse */
    CuiCarouselComponent.ctorParameters = function () { return []; };
    CuiCarouselComponent.propDecorators = {
        "items": [{ type: Input },],
        "data": [{ type: Input },],
        "indigo": [{ type: Input },],
    };
    return CuiCarouselComponent;
}());
export { CuiCarouselComponent };
//# sourceMappingURL=cui-carousel.component.js.map