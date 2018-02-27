import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';
import { CuiDialogService, CUI_DIALOG_SCROLL_STRATEGY_PROVIDER, } from './cui-dialog.service';
import { CuiDialogComponent } from './cui-dialog.component';
import { CuiDialogClose, CuiDialogContent, CuiDialogTitle, CuiDialogActions, } from './cui-dialog.directive';
var CuiDialogModule = (function () {
    function CuiDialogModule() {
    }
    CuiDialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        PortalModule,
                        A11yModule,
                    ],
                    exports: [
                        CuiDialogComponent,
                        CuiDialogClose,
                        CuiDialogTitle,
                        CuiDialogContent,
                        CuiDialogActions,
                    ],
                    declarations: [
                        CuiDialogComponent,
                        CuiDialogClose,
                        CuiDialogTitle,
                        CuiDialogActions,
                        CuiDialogContent,
                    ],
                    providers: [
                        CuiDialogService,
                        CUI_DIALOG_SCROLL_STRATEGY_PROVIDER,
                    ],
                    entryComponents: [
                        CuiDialogComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiDialogModule.ctorParameters = function () { return []; };
    return CuiDialogModule;
}());
export { CuiDialogModule };
//# sourceMappingURL=cui-dialog.module.js.map