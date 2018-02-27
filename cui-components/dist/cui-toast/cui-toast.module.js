import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiToastComponent } from './cui-toast.component';
import { CuiToasterComponent, CuiToasterService } from './cui-toaster.component';
var CuiToastModule = (function () {
    function CuiToastModule() {
    }
    CuiToastModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        CuiToastComponent,
                        CuiToasterComponent,
                    ],
                    exports: [
                        CuiToastComponent,
                        CuiToasterComponent,
                    ],
                    providers: [
                        CuiToasterService,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiToastModule.ctorParameters = function () { return []; };
    return CuiToastModule;
}());
export { CuiToastModule };
//# sourceMappingURL=cui-toast.module.js.map