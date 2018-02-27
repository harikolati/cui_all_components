import { Component, Input } from '@angular/core';
var CuiStepsComponent = (function () {
    function CuiStepsComponent() {
        /**
             * Optional alternate background (1)
             */
        this.alt = 0;
    }
    CuiStepsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-steps',
                    template: "<div class=\"ui-steps\" [ngClass]=\"{'ui-steps--vertical': vertical}\"> <div *ngFor=\"let step of steps\" class=\"ui-step\" [ngClass]=\"{'visited': step.visited, 'active': step.active, 'ui-step--alt': alt}\"> <div class=\"step__icon {{step.class}}\" [ngClass]=\"{'step__icon--small': small}\">{{step.number}}</div> <div class=\"step__label\" *ngIf=\"step.label\">{{step.label}}</div> </div> </div> ",
                },] },
    ];
    /** @nocollapse */
    CuiStepsComponent.ctorParameters = function () { return []; };
    CuiStepsComponent.propDecorators = {
        "steps": [{ type: Input },],
        "alt": [{ type: Input },],
        "vertical": [{ type: Input },],
        "small": [{ type: Input },],
    };
    return CuiStepsComponent;
}());
export { CuiStepsComponent };
//# sourceMappingURL=cui-steps.component.js.map