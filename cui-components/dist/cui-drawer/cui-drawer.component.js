import { Component, Input } from '@angular/core';
var CuiDrawerComponent = (function () {
    function CuiDrawerComponent() {
        /**
             * Whether to toggle carets from right (collapsed) to down (expanded)
             */
        this.rightToDown = false;
        /**
             * Whether to start with the drawer expanded
             */
        this.expanded = false;
        /**
             * Whether to put the caret on the left side of the drawer
             */
        this.caretLeft = false;
        /**
             * Whether to use content projection or normal input fields
             */
        this.projection = false;
        /**
             * Custom class to apply to panel div
             */
        this.panelClass = '';
        /**
             * Whether to allow the drawer to be expanded
             */
        this.allowExpand = true;
    }
    /**
     * Toggles the drawer open/closed
     */
    /**
         * Toggles the drawer open/closed
         */
    CuiDrawerComponent.prototype.toggleExpanded = /**
         * Toggles the drawer open/closed
         */
    function () {
        if (this.allowExpand) {
            this.expanded = !this.expanded;
        }
    };
    CuiDrawerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-drawer',
                    template: "<div class=\"panel {{ panelClass }}\"> <div class=\"panel__header flex-center-vertical toggle\" (click)=\"toggleExpanded()\"> <div class=\"flex-fluid text-ellipsis\"> <ng-content *ngIf=\"projection\" select=\".cui-drawer-label\"></ng-content> <span id=\"label\" *ngIf=\"label && !projection\" [innerHTML]=\"label\"></span> </div> <span *ngIf=\"allowExpand\" [ngClass]=\"{'pull-left half-margin-right': caretLeft, 'pull-right': !caretLeft}\"> <span *ngIf=\"rightToDown\" [ngClass]=\"{'icon-chevron-right': !expanded, 'icon-chevron-up': expanded}\"></span> <span *ngIf=\"!rightToDown\" [ngClass]=\"{'icon-chevron-down': !expanded, 'icon-chevron-up': expanded}\"></span> </span> </div> <div class=\"half-margin-top\" *ngIf=\"expanded\"> <div class=\"panel__body\" *ngIf=\"projection\"> <ng-content  select=\".cui-drawer-content\"></ng-content> </div> <div *ngIf=\"!projection\" [innerHTML]=\"content\"></div> </div> </div> ",
                },] },
    ];
    /** @nocollapse */
    CuiDrawerComponent.ctorParameters = function () { return []; };
    CuiDrawerComponent.propDecorators = {
        "label": [{ type: Input },],
        "content": [{ type: Input },],
        "rightToDown": [{ type: Input },],
        "expanded": [{ type: Input },],
        "caretLeft": [{ type: Input },],
        "projection": [{ type: Input },],
        "panelClass": [{ type: Input },],
        "allowExpand": [{ type: Input },],
    };
    return CuiDrawerComponent;
}());
export { CuiDrawerComponent };
//# sourceMappingURL=cui-drawer.component.js.map