import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiLabelsComponent } from './cui-labels.component';
var CuiLabelsModule = (function () {
    function CuiLabelsModule() {
    }
    CuiLabelsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [CuiLabelsComponent],
                    exports: [CuiLabelsComponent],
                },] },
    ];
    /** @nocollapse */
    CuiLabelsModule.ctorParameters = function () { return []; };
    return CuiLabelsModule;
}());
export { CuiLabelsModule };
//# sourceMappingURL=cui-labels.module.js.map