import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiProgressbarComponent } from './cui-progressbar.component';
var CuiProgressbarModule = (function () {
    function CuiProgressbarModule() {
    }
    CuiProgressbarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiProgressbarComponent,
                    ],
                    exports: [
                        CuiProgressbarComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiProgressbarModule.ctorParameters = function () { return []; };
    return CuiProgressbarModule;
}());
export { CuiProgressbarModule };
//# sourceMappingURL=cui-progressbar.module.js.map