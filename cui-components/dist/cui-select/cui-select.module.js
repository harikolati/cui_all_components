import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiSelectComponent } from './cui-select.component';
import { CuiSelectPaginatorDirective } from './cui-select-paginator.directive';
import { CuiSelectKeyControlDirective } from './cui-select-key-control.directive';
var CuiSelectModule = (function () {
    function CuiSelectModule() {
    }
    CuiSelectModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiSelectComponent,
                        CuiSelectKeyControlDirective,
                        CuiSelectPaginatorDirective,
                    ],
                    exports: [
                        CuiSelectComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiSelectModule.ctorParameters = function () { return []; };
    return CuiSelectModule;
}());
export { CuiSelectModule };
//# sourceMappingURL=cui-select.module.js.map