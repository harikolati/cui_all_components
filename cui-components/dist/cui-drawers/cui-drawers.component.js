import { Component, Output, EventEmitter, Input } from '@angular/core';
var CuiDrawersComponent = (function () {
    function CuiDrawersComponent() {
        /**
             * Array of drawer components in the group
             */
        this.drawers = [];
        this.drawersChange = new EventEmitter();
        /**
             * Optional alt background for the group header (1)
             */
        this.alt = 0;
        /**
             * Whether to toggle carets from right (collapsed) to down (expanded)
             */
        this.rightToDown = false;
        /**
             * Whether to start with all drawers expanded
             */
        this.expanded = false;
        /**
             * Whether to allow clicking the header to expand/collapse all drawers
             */
        this.allowExpandAll = false;
        /**
             * Whether to put the caret on the left side of the drawer
             */
        this.caretLeft = false;
        /**
             * Whether to use content projection or normal input fields
             */
        this.projection = false;
        /**
             * Generated class string for the header background
             */
        this.colorClass = 'panel--ltgray';
    }
    CuiDrawersComponent.prototype.ngOnInit = function () {
        if (this.alt) {
            this.colorClass = '';
        }
        if (this.expanded) {
            for (var _i = 0, _a = this.drawers; _i < _a.length; _i++) {
                var drawer = _a[_i];
                drawer.expanded = true;
            }
        }
    };
    /**
     * Toggles all drawers open/closed
     */
    /**
         * Toggles all drawers open/closed
         */
    CuiDrawersComponent.prototype.toggleAllExpanded = /**
         * Toggles all drawers open/closed
         */
    function () {
        if (this.allowExpandAll) {
            this.expanded = !this.expanded;
        }
        for (var _i = 0, _a = this.drawers; _i < _a.length; _i++) {
            var drawer = _a[_i];
            drawer.expanded = this.expanded;
        }
        this.drawersChange.emit(this.drawers);
    };
    CuiDrawersComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-drawers',
                    template: "<div class=\"panel-group panel-group--compressed\"> <div class=\"panel {{colorClass}}\" [ngClass]=\"{'toggle': allowExpandAll}\" (click)=\"toggleAllExpanded()\" *ngIf=\"label || allowExpandAll\"> <h6> <span *ngIf=\"label\" [innerHTML]=\"label\"></span> <span [ngClass]=\"{'pull-left half-margin-right': caretLeft, 'pull-right': !caretLeft}\" *ngIf=\"allowExpandAll\"> <span *ngIf=\"rightToDown\" [ngClass]=\"{'icon-chevron-right': !expanded, 'icon-chevron-up': expanded}\"></span> <span *ngIf=\"!rightToDown\" [ngClass]=\"{'icon-chevron-down': !expanded, 'icon-chevron-up': expanded}\"></span> </span> </h6> </div> <div *ngIf=\"projection\"> <ng-content></ng-content> </div> <div *ngIf=\"!projection\"> <cui-drawer [projection]=\"projection\" *ngFor=\"let drawer of drawers\" [label]=\"drawer.label\" [content]=\"drawer.content\" [expanded]=\"drawer.expanded\" [rightToDown]=\"rightToDown\" [caretLeft]=\"caretLeft\"></cui-drawer> </div> </div> ",
                },] },
    ];
    /** @nocollapse */
    CuiDrawersComponent.ctorParameters = function () { return []; };
    CuiDrawersComponent.propDecorators = {
        "label": [{ type: Input },],
        "drawers": [{ type: Input },],
        "drawersChange": [{ type: Output },],
        "alt": [{ type: Input },],
        "rightToDown": [{ type: Input },],
        "expanded": [{ type: Input },],
        "allowExpandAll": [{ type: Input },],
        "caretLeft": [{ type: Input },],
        "projection": [{ type: Input },],
    };
    return CuiDrawersComponent;
}());
export { CuiDrawersComponent };
//# sourceMappingURL=cui-drawers.component.js.map