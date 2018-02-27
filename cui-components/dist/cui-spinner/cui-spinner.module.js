import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiSpinnerComponent } from './cui-spinner.component';
var CuiSpinnerModule = (function () {
    function CuiSpinnerModule() {
    }
    CuiSpinnerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        CuiSpinnerComponent,
                    ],
                    exports: [
                        CuiSpinnerComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiSpinnerModule.ctorParameters = function () { return []; };
    return CuiSpinnerModule;
}());
export { CuiSpinnerModule };
//# sourceMappingURL=cui-spinner.module.js.map