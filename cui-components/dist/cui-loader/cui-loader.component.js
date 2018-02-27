import { Component, Input } from '@angular/core';
var CuiLoaderComponent = (function () {
    function CuiLoaderComponent() {
        /**
             * Optional loading dots color (muted [default], white, info, primary, warning)
             */
        this.color = 'muted';
    }
    /**
     * Returns the loading dots color class string
     * @returns The color class string
     */
    /**
         * Returns the loading dots color class string
         * @returns The color class string
         */
    CuiLoaderComponent.prototype.getColorClass = /**
         * Returns the loading dots color class string
         * @returns The color class string
         */
    function () {
        if (this.color === 'white') {
            return '';
        }
        return "loading-dots--" + this.color;
    };
    CuiLoaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-loader',
                    template: "<div> <h4 class=\"text-center\" *ngIf=\"label\">{{label}}</h4> <div class=\"loading-dots {{getColorClass()}}\"> <span></span> <span></span> <span></span> </div> </div> ",
                },] },
    ];
    /** @nocollapse */
    CuiLoaderComponent.ctorParameters = function () { return []; };
    CuiLoaderComponent.propDecorators = {
        "label": [{ type: Input },],
        "color": [{ type: Input },],
    };
    return CuiLoaderComponent;
}());
export { CuiLoaderComponent };
//# sourceMappingURL=cui-loader.component.js.map