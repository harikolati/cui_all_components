import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiBillboardPanelComponent } from './cui-billboard-panel.component';
import { BreakpointsService } from '@cisco-ngx/cui-services';
var CuiBillboardPanelModule = (function () {
    function CuiBillboardPanelModule() {
    }
    CuiBillboardPanelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [CuiBillboardPanelComponent],
                    exports: [CuiBillboardPanelComponent],
                    providers: [BreakpointsService],
                },] },
    ];
    /** @nocollapse */
    CuiBillboardPanelModule.ctorParameters = function () { return []; };
    return CuiBillboardPanelModule;
}());
export { CuiBillboardPanelModule };
//# sourceMappingURL=cui-billboard-panel.module.js.map