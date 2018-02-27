import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiTimelineComponent } from './cui-timeline.component';
var CuiTimelineModule = (function () {
    function CuiTimelineModule() {
    }
    CuiTimelineModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        CuiTimelineComponent,
                    ],
                    exports: [
                        CuiTimelineComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiTimelineModule.ctorParameters = function () { return []; };
    return CuiTimelineModule;
}());
export { CuiTimelineModule };
//# sourceMappingURL=cui-timeline.module.js.map