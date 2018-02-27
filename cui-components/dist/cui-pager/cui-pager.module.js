import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiPagerComponent } from './cui-pager.component';
var CuiPagerModule = (function () {
    function CuiPagerModule() {
    }
    CuiPagerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiPagerComponent,
                    ],
                    exports: [
                        CuiPagerComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiPagerModule.ctorParameters = function () { return []; };
    return CuiPagerModule;
}());
export { CuiPagerModule };
//# sourceMappingURL=cui-pager.module.js.map