import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiTableComponent } from './cui-table.component';
var CuiTableModule = (function () {
    function CuiTableModule() {
    }
    CuiTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiTableComponent,
                    ],
                    exports: [
                        CuiTableComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiTableModule.ctorParameters = function () { return []; };
    return CuiTableModule;
}());
export { CuiTableModule };
//# sourceMappingURL=cui-table.module.js.map