import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiLoaderComponent } from './cui-loader.component';
var CuiLoaderModule = (function () {
    function CuiLoaderModule() {
    }
    CuiLoaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiLoaderComponent,
                    ],
                    exports: [
                        CuiLoaderComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiLoaderModule.ctorParameters = function () { return []; };
    return CuiLoaderModule;
}());
export { CuiLoaderModule };
//# sourceMappingURL=cui-loader.module.js.map