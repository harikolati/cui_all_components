import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CuiHeaderComponent } from './cui-header.component';
var CuiHeaderModule = (function () {
    function CuiHeaderModule() {
    }
    CuiHeaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        RouterModule,
                    ],
                    declarations: [
                        CuiHeaderComponent,
                    ],
                    exports: [
                        CuiHeaderComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiHeaderModule.ctorParameters = function () { return []; };
    return CuiHeaderModule;
}());
export { CuiHeaderModule };
//# sourceMappingURL=cui-header.module.js.map