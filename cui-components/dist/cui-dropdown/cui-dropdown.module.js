import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiDropdownComponent } from './cui-dropdown.component';
var CuiDropdownModule = (function () {
    function CuiDropdownModule() {
    }
    CuiDropdownModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiDropdownComponent,
                    ],
                    exports: [
                        CuiDropdownComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiDropdownModule.ctorParameters = function () { return []; };
    return CuiDropdownModule;
}());
export { CuiDropdownModule };
//# sourceMappingURL=cui-dropdown.module.js.map