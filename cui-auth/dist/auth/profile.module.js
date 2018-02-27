/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';
import { ProperCasePipeModule } from '@cisco-ngx/cui-pipes';
var ProfileModule = (function () {
    function ProfileModule() {
    }
    ProfileModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        HttpClientModule,
                        ProperCasePipeModule,
                    ],
                    providers: [
                        ProfileService,
                    ],
                },] },
    ];
    /** @nocollapse */
    ProfileModule.ctorParameters = function () { return []; };
    return ProfileModule;
}());
export { ProfileModule };
function ProfileModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ProfileModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ProfileModule.ctorParameters;
}
//# sourceMappingURL=profile.module.js.map