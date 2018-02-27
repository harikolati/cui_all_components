var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse, } from '@angular/common/http';
import { get } from 'lodash-es';
import { ClientSSOService } from './client-sso.service';
import { WindowRefService } from './window-ref.service';
var ClientSSOInterceptor = (function () {
    function ClientSSOInterceptor(injector, windowRef) {
        this.injector = injector;
        this.windowRef = windowRef;
    }
    /**
     * Intercepts angular HttpClient requests and attaches a bearerToken
     * from the global cisco object.
     * @param req
     * @param next
     * @return Observable<HttpEvent<any>>
     */
    /**
     * Intercepts angular HttpClient requests and attaches a bearerToken
     * from the global cisco object.
     * @param {?} req
     * @param {?} next
     * @return {?} Observable<HttpEvent<any>>
     */
    ClientSSOInterceptor.prototype.intercept = /**
     * Intercepts angular HttpClient requests and attaches a bearerToken
     * from the global cisco object.
     * @param {?} req
     * @param {?} next
     * @return {?} Observable<HttpEvent<any>>
     */
    function (req, next) {
        var _this = this;
        var /** @type {?} */ clientSSOService = this.injector.get(ClientSSOService);
        var /** @type {?} */ bearerToken = get(this, 'windowRef.nativeWindow.cisco.bearerToken', '');
        var /** @type {?} */ dupReq;
        if (req.headers.get('Authorization') === null &&
            clientSSOService.tokenUrl !== req.url) {
            dupReq = req.clone({
                headers: req.headers.set('Authorization', bearerToken),
            });
        }
        return next.handle(dupReq || req).pipe(tap(function () { }, function (err) { return __awaiter(_this, void 0, void 0, function () {
            var token, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(err instanceof HttpErrorResponse && err.status === 401 &&
                            clientSSOService.tokenUrl !== req.url)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, clientSSOService.getAuthToken(true)];
                    case 2:
                        token = _a.sent();
                        if (!token.authenticated) {
                            // if not authenticated, redirect to login
                            this.windowRef.nativeWindow.location.href = token.loginURL;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        throw new Error("Token Request Failed: " + e_1.error);
                    case 4: return [2 /*return*/];
                }
            });
        }); }));
    };
    ClientSSOInterceptor.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ClientSSOInterceptor.ctorParameters = function () { return [
        { type: Injector, },
        { type: WindowRefService, },
    ]; };
    return ClientSSOInterceptor;
}());
export { ClientSSOInterceptor };
function ClientSSOInterceptor_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ClientSSOInterceptor.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ClientSSOInterceptor.ctorParameters;
    /** @type {?} */
    ClientSSOInterceptor.prototype.injector;
    /** @type {?} */
    ClientSSOInterceptor.prototype.windowRef;
}
//# sourceMappingURL=client-sso.interceptor.js.map