import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiAlertComponent } from './cui-alert.component';
import { CuiAlertService } from './cui-alert.service';
var CuiAlertModule = (function () {
    function CuiAlertModule() {
    }
    CuiAlertModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        CuiAlertComponent,
                    ],
                    providers: [
                        CuiAlertService,
                    ],
                    exports: [
                        CuiAlertComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiAlertModule.ctorParameters = function () { return []; };
    return CuiAlertModule;
}());
export { CuiAlertModule };
//# sourceMappingURL=cui-alert.module.js.map