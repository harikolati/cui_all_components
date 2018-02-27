import { Component, Input } from '@angular/core';
var CuiSpinnerComponent = (function () {
    function CuiSpinnerComponent() {
        /**
             * Optional spinner color ('blue' [default], indigo)
             */
        this.color = 'blue';
    }
    CuiSpinnerComponent.prototype.getColorClass = function () {
        if (this.color === 'blue') {
            return '';
        }
        return "loading-spinner--" + this.color;
    };
    CuiSpinnerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-spinner',
                    template: "<div [class]=\"getColorClass()\"> <div class=\"wrapper\"> <div class=\"wheel\"></div> </div> </div>  ",
                    host: { class: 'loading-spinner flex-center' },
                },] },
    ];
    /** @nocollapse */
    CuiSpinnerComponent.ctorParameters = function () { return []; };
    CuiSpinnerComponent.propDecorators = {
        "color": [{ type: Input },],
    };
    return CuiSpinnerComponent;
}());
export { CuiSpinnerComponent };
//# sourceMappingURL=cui-spinner.component.js.map