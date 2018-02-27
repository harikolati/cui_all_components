import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CuiBreadcrumbsComponent } from './cui-breadcrumbs.component';
var CuiBreadcrumbsModule = (function () {
    function CuiBreadcrumbsModule() {
    }
    CuiBreadcrumbsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        RouterModule,
                    ],
                    declarations: [
                        CuiBreadcrumbsComponent,
                    ],
                    exports: [
                        CuiBreadcrumbsComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiBreadcrumbsModule.ctorParameters = function () { return []; };
    return CuiBreadcrumbsModule;
}());
export { CuiBreadcrumbsModule };
//# sourceMappingURL=cui-breadcrumbs.module.js.map