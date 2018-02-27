import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiDrawerModule } from '../cui-drawer/cui-drawer.module';
import { CuiDrawersComponent } from './cui-drawers.component';
var CuiDrawersModule = (function () {
    function CuiDrawersModule() {
    }
    CuiDrawersModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        CuiDrawerModule,
                    ],
                    declarations: [
                        CuiDrawersComponent,
                    ],
                    exports: [
                        CuiDrawersComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiDrawersModule.ctorParameters = function () { return []; };
    return CuiDrawersModule;
}());
export { CuiDrawersModule };
//# sourceMappingURL=cui-drawers.module.js.map