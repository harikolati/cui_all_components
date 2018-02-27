/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Dir } from './dir';
import { DIR_DOCUMENT, Directionality } from './directionality';
var BidiModule = (function () {
    function BidiModule() {
    }
    BidiModule.decorators = [
        { type: NgModule, args: [{
                    exports: [Dir],
                    declarations: [Dir],
                    providers: [
                        { provide: DIR_DOCUMENT, useExisting: DOCUMENT },
                        Directionality,
                    ]
                },] },
    ];
    /** @nocollapse */
    BidiModule.ctorParameters = function () { return []; };
    return BidiModule;
}());
export { BidiModule };
//# sourceMappingURL=bidi-module.js.map