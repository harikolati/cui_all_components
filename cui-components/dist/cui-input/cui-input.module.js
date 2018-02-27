import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiInputComponent } from './cui-input.component';
var CuiInputModule = (function () {
    function CuiInputModule() {
    }
    CuiInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiInputComponent,
                    ],
                    exports: [
                        CuiInputComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiInputModule.ctorParameters = function () { return []; };
    return CuiInputModule;
}());
export { CuiInputModule };
//# sourceMappingURL=cui-input.module.js.map