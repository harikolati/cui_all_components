import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiFooterComponent } from './cui-footer.component';
var CuiFooterModule = (function () {
    function CuiFooterModule() {
    }
    CuiFooterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiFooterComponent,
                    ],
                    exports: [
                        CuiFooterComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiFooterModule.ctorParameters = function () { return []; };
    return CuiFooterModule;
}());
export { CuiFooterModule };
//# sourceMappingURL=cui-footer.module.js.map