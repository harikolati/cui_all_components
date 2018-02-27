import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiGaugeComponent } from './cui-gauge.component';
var CuiGaugeModule = (function () {
    function CuiGaugeModule() {
    }
    CuiGaugeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiGaugeComponent,
                    ],
                    exports: [
                        CuiGaugeComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiGaugeModule.ctorParameters = function () { return []; };
    return CuiGaugeModule;
}());
export { CuiGaugeModule };
//# sourceMappingURL=cui-gauge.module.js.map