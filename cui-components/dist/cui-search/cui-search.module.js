import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiSearchComponent } from './cui-search.component';
var CuiSearchModule = (function () {
    function CuiSearchModule() {
    }
    CuiSearchModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiSearchComponent,
                    ],
                    exports: [
                        CuiSearchComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiSearchModule.ctorParameters = function () { return []; };
    return CuiSearchModule;
}());
export { CuiSearchModule };
//# sourceMappingURL=cui-search.module.js.map