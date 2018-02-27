import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiFormFieldComponent } from './cui-form-field.component';
import { CuiInputDirective } from './cui-input.directive';
var CuiFormFieldModule = (function () {
    function CuiFormFieldModule() {
    }
    CuiFormFieldModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [CuiFormFieldComponent, CuiInputDirective],
                    exports: [CuiFormFieldComponent, CuiInputDirective],
                },] },
    ];
    /** @nocollapse */
    CuiFormFieldModule.ctorParameters = function () { return []; };
    return CuiFormFieldModule;
}());
export { CuiFormFieldModule };
//# sourceMappingURL=cui-form-field.module.js.map