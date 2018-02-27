import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiDrawerComponent } from './cui-drawer.component';
var CuiDrawerModule = (function () {
    function CuiDrawerModule() {
    }
    CuiDrawerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        CuiDrawerComponent,
                    ],
                    exports: [
                        CuiDrawerComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiDrawerModule.ctorParameters = function () { return []; };
    return CuiDrawerModule;
}());
export { CuiDrawerModule };
//# sourceMappingURL=cui-drawer.module.js.map