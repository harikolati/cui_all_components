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
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from '../auth/profile.service';
var /** @type {?} */ serviceUrl = '/ws/preferences/v1/';
var PreferenceService = (function () {
    function PreferenceService(http, profileService) {
        this.http = http;
        this.profileService = profileService;
        this.headers = new HttpHeaders()
            .append('Authorization', this.profileService.getBearerToken());
    }
    /**
     * Retrieves preferences for a user in an environment.
     * @return {?} The user's preferences
     */
    PreferenceService.prototype.fetch = /**
     * Retrieves preferences for a user in an environment.
     * @return {?} The user's preferences
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.preferences) {
                            return [2 /*return*/, this.preferences];
                        }
                        _a = this;
                        return [4 /*yield*/, this.http.get(serviceUrl, { headers: this.headers })
                                .toPromise()];
                    case 1:
                        _a.preferences = _b.sent();
                        return [2 /*return*/, this.preferences];
                }
            });
        });
    };
    /**
     * Updates a user's preferences for an environment
     * @param {?} preferences The user's preferences
     * @return {?} The updated user preferences
     */
    PreferenceService.prototype.update = /**
     * Updates a user's preferences for an environment
     * @param {?} preferences The user's preferences
     * @return {?} The updated user preferences
     */
    function (preferences) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.put(serviceUrl, preferences, { headers: this.headers })
                            .toPromise()];
                    case 1:
                        _a.sent();
                        this.preferences = preferences;
                        return [2 /*return*/, this.preferences];
                }
            });
        });
    };
    PreferenceService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PreferenceService.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: ProfileService, },
    ]; };
    return PreferenceService;
}());
export { PreferenceService };
function PreferenceService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PreferenceService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PreferenceService.ctorParameters;
    /** @type {?} */
    PreferenceService.prototype.headers;
    /** @type {?} */
    PreferenceService.prototype.preferences;
    /** @type {?} */
    PreferenceService.prototype.http;
    /** @type {?} */
    PreferenceService.prototype.profileService;
}
//# sourceMappingURL=preference.service.js.map