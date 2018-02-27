import { Component, Input } from '@angular/core';
var CuiGaugeComponent = (function () {
    function CuiGaugeComponent() {
        /**
             * Alternate background color (1)
             */
        this.alt = 0;
    }
    CuiGaugeComponent.prototype.ngOnInit = function () {
        if (this.animated) {
            this.animate();
        }
    };
    /**
     * Drops the percentage to zero to start an animation
     */
    /**
         * Drops the percentage to zero to start an animation
         */
    CuiGaugeComponent.prototype.animate = /**
         * Drops the percentage to zero to start an animation
         */
    function () {
        var _this = this;
        var originalPercentage = this.percentage;
        this.percentage = 0;
        setTimeout(function () {
            _this.percentage = originalPercentage;
        }, 1);
    };
    CuiGaugeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-gauge',
                    template: "<div class=\"gauge-container\"> <div class=\"gauge gauge--{{color}} gauge--{{size}} {{alt ? 'gauge--alt' : ''}}\" [attr.data-percentage]=\"percentage\"> <div class=\"gauge__circle\"> <div class=\"mask full\"> <div class=\"fill\" [ngClass]=\"{'animated': animated}\"></div> </div> <div class=\"mask half\"> <div class=\"fill\" [ngClass]=\"{'animated': animated}\"></div> <div class=\"fill fix\" [ngClass]=\"{'animated': animated}\"></div> </div> </div> <div class=\"gauge__inset\"> <div class=\"gauge__percentage\">{{value || percentage}}</div> </div> </div> <div class=\"gauge__label\" *ngIf=\"label\">{{label}}</div> </div> ",
                },] },
    ];
    /** @nocollapse */
    CuiGaugeComponent.ctorParameters = function () { return []; };
    CuiGaugeComponent.propDecorators = {
        "percentage": [{ type: Input },],
        "value": [{ type: Input },],
        "size": [{ type: Input },],
        "alt": [{ type: Input },],
        "color": [{ type: Input },],
        "label": [{ type: Input },],
        "animated": [{ type: Input },],
    };
    return CuiGaugeComponent;
}());
export { CuiGaugeComponent };
//# sourceMappingURL=cui-gauge.component.js.map