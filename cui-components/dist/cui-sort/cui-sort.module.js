import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiSortComponent } from './cui-sort.component';
var CuiSortModule = (function () {
    function CuiSortModule() {
    }
    CuiSortModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiSortComponent,
                    ],
                    exports: [
                        CuiSortComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiSortModule.ctorParameters = function () { return []; };
    return CuiSortModule;
}());
export { CuiSortModule };
//# sourceMappingURL=cui-sort.module.js.map