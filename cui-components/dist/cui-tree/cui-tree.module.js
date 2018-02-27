import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CuiTreeComponent } from './cui-tree.component';
import { CuiTreePipe } from './cui-tree.pipe';
var CuiTreeModule = (function () {
    function CuiTreeModule() {
    }
    CuiTreeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        RouterModule,
                    ],
                    declarations: [
                        CuiTreeComponent,
                        CuiTreePipe,
                    ],
                    exports: [
                        CuiTreeComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiTreeModule.ctorParameters = function () { return []; };
    return CuiTreeModule;
}());
export { CuiTreeModule };
//# sourceMappingURL=cui-tree.module.js.map