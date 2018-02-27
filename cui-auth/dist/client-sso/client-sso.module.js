/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ClientSSOGuard } from './client-sso.guard';
import { ClientSSOResolver } from './client-sso.resolver';
import { ClientSSOService } from './client-sso.service';
import { ClientSSOInterceptor } from './client-sso.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProfileService } from '../auth/profile.service';
import { WindowRefService } from './window-ref.service';
var ClientSSOModule = (function () {
    function ClientSSOModule() {
    }
    ClientSSOModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        HttpClientModule,
                    ],
                    providers: [
                        ClientSSOGuard,
                        ClientSSOResolver,
                        ClientSSOService,
                        ProfileService,
                        WindowRefService,
                        {
                            provide: HTTP_INTERCEPTORS,
                            useClass: ClientSSOInterceptor,
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    ClientSSOModule.ctorParameters = function () { return []; };
    return ClientSSOModule;
}());
export { ClientSSOModule };
function ClientSSOModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ClientSSOModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ClientSSOModule.ctorParameters;
}
//# sourceMappingURL=client-sso.module.js.map