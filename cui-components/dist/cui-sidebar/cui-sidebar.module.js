import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiSidebarComponent } from './cui-sidebar.component';
var CuiSidebarModule = (function () {
    function CuiSidebarModule() {
    }
    CuiSidebarModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiSidebarComponent,
                    ],
                    exports: [
                        CuiSidebarComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiSidebarModule.ctorParameters = function () { return []; };
    return CuiSidebarModule;
}());
export { CuiSidebarModule };
//# sourceMappingURL=cui-sidebar.module.js.map