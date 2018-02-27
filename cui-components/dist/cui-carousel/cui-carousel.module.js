import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiCarouselComponent } from './cui-carousel.component';
var CuiCarouselModule = (function () {
    function CuiCarouselModule() {
    }
    CuiCarouselModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        CuiCarouselComponent,
                    ],
                    exports: [
                        CuiCarouselComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiCarouselModule.ctorParameters = function () { return []; };
    return CuiCarouselModule;
}());
export { CuiCarouselModule };
//# sourceMappingURL=cui-carousel.module.js.map