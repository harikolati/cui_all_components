import { CommonModule } from '@angular/common';
import { CuiGridComponent } from './cui-grid.component';
import { CuiCardHeaderComponent } from './cui-card-header/cui-card-header.component';
import { CuiCardBodyComponent } from './cui-card-body/cui-card-body.component';
import { CuiCardFooterComponent } from './cui-card-footer/cui-card-footer.component';
import { NgModule } from '@angular/core';
var CuiGridModule = (function () {
    function CuiGridModule() {
    }
    CuiGridModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    declarations: [
                        CuiGridComponent,
                        CuiCardHeaderComponent,
                        CuiCardBodyComponent,
                        CuiCardFooterComponent
                    ],
                    exports: [
                        CuiGridComponent,
                        CuiCardHeaderComponent,
                        CuiCardBodyComponent,
                        CuiCardFooterComponent
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiGridModule.ctorParameters = function () { return []; };
    return CuiGridModule;
}());
export { CuiGridModule };
//# sourceMappingURL=cui-grid.module.js.map