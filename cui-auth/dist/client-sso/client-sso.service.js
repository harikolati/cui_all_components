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
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WindowRefService } from './window-ref.service';
import { ProfileService } from '../auth/profile.service';
import { AuthUser } from './auth-user.model';
import { Token } from './token.model';
import { get as _get, isNil } from 'lodash-es';
var ClientSSOService = (function () {
    function ClientSSOService(profile, windowRef, http, env) {
        this.profile = profile;
        this.windowRef = windowRef;
        this.http = http;
        this.env = env;
        this.authenticated = false;
        this.tokenLoaded = false;
        this.userLoaded = false;
        this.user = new AuthUser({});
    }
    /**
     * @param {?=} force
     * @return {?}
     */
    ClientSSOService.prototype.getAuthToken = /**
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, interval;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isNil(_get(this, 'env.auth.tokenUrl'))) {
                            return [2 /*return*/, Promise.reject('No auth.tokenUrl in ENVIRONMENT')];
                        }
                        this.tokenUrl = this.env.auth.tokenUrl;
                        if (_get(this, 'token') && !force) {
                            return [2 /*return*/, this.token];
                        }
                        return [4 /*yield*/, /** @type {?} */ (this.http.get(this.env.auth.tokenUrl, { withCredentials: true }).toPromise())];
                    case 1:
                        result = _a.sent();
                        this.token = new Token(result);
                        this.tokenLoaded = true;
                        this.authenticated = this.token.authenticated;
                        this.bearerToken = this.token.tokenString;
                        this.loginUrl = this.token.loginURL;
                        this.logoutUrl = this.token.logoutURL;
                        this.profile.cisco = { bearerToken: this.bearerToken };
                        this.windowRef.nativeWindow.cisco = { bearerToken: this.bearerToken };
                        interval = setInterval(function () {
                            _this.loginUrl = '';
                            clearInterval(interval);
                        }, this.token.expires);
                        return [2 /*return*/, this.token];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    ClientSSOService.prototype.getAuthUser = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isNil(_get(this, 'env.auth.accountUrl'))) {
                            return [2 /*return*/, Promise.reject('No auth.accountUrl in ENVIRONMENT')];
                        }
                        return [4 /*yield*/, /** @type {?} */ (this.http.get(this.env.auth.accountUrl, { withCredentials: true }).toPromise())];
                    case 1:
                        result = _a.sent();
                        this.user = new AuthUser(result);
                        this.profile.cisco.user = _get(result, 'user');
                        this.windowRef.nativeWindow.cisco.user = _get(result, 'user');
                        this.userLoaded = true;
                        return [2 /*return*/, this.user];
                }
            });
        });
    };
    ClientSSOService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ClientSSOService.ctorParameters = function () { return [
        { type: ProfileService, },
        { type: WindowRefService, },
        { type: HttpClient, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: ['ENVIRONMENT',] },] },
    ]; };
    return ClientSSOService;
}());
export { ClientSSOService };
function ClientSSOService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ClientSSOService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ClientSSOService.ctorParameters;
    /** @type {?} */
    ClientSSOService.prototype.authenticated;
    /** @type {?} */
    ClientSSOService.prototype.bearerToken;
    /** @type {?} */
    ClientSSOService.prototype.tokenLoaded;
    /** @type {?} */
    ClientSSOService.prototype.tokenUrl;
    /** @type {?} */
    ClientSSOService.prototype.userLoaded;
    /** @type {?} */
    ClientSSOService.prototype.user;
    /** @type {?} */
    ClientSSOService.prototype.loginUrl;
    /** @type {?} */
    ClientSSOService.prototype.logoutUrl;
    /** @type {?} */
    ClientSSOService.prototype.token;
    /** @type {?} */
    ClientSSOService.prototype.profile;
    /** @type {?} */
    ClientSSOService.prototype.windowRef;
    /** @type {?} */
    ClientSSOService.prototype.http;
    /** @type {?} */
    ClientSSOService.prototype.env;
}
//# sourceMappingURL=client-sso.service.js.map