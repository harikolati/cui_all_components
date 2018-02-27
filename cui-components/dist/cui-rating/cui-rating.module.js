import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiRatingComponent } from './cui-rating.component';
var CuiRatingModule = (function () {
    function CuiRatingModule() {
    }
    CuiRatingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiRatingComponent,
                    ],
                    exports: [
                        CuiRatingComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiRatingModule.ctorParameters = function () { return []; };
    return CuiRatingModule;
}());
export { CuiRatingModule };
//# sourceMappingURL=cui-rating.module.js.map