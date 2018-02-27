import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiButtonComponent } from './cui-button.component';
var CuiButtonModule = (function () {
    function CuiButtonModule() {
    }
    CuiButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [CuiButtonComponent],
                    exports: [CuiButtonComponent],
                },] },
    ];
    /** @nocollapse */
    CuiButtonModule.ctorParameters = function () { return []; };
    return CuiButtonModule;
}());
export { CuiButtonModule };
//# sourceMappingURL=cui-button.module.js.map