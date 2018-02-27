/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/toPromise";
var DynamicPagerService = (function () {
    function DynamicPagerService(http) {
        this.http = http;
        this.serviceUrl = '';
    }
    /**
     * Sets the base URL of the service to call
     * @param {?} url The new base URL
     * @return {?}
     */
    DynamicPagerService.prototype.setServiceUrl = /**
     * Sets the base URL of the service to call
     * @param {?} url The new base URL
     * @return {?}
     */
    function (url) {
        this.serviceUrl = url;
    };
    /**
     * Retrieves a single object from the service
     * @param {?=} id
     * @param {?=} params
     * @return {?} The object retrieved from the service
     */
    DynamicPagerService.prototype.get = /**
     * Retrieves a single object from the service
     * @param {?=} id
     * @param {?=} params
     * @return {?} The object retrieved from the service
     */
    function (id, params) {
        if (id === void 0) { id = ''; }
        if (params === void 0) { params = {}; }
        var /** @type {?} */ url = this.serviceUrl + "/" + id + this.buildParamsString(params);
        return this.http.get(url)
            .toPromise()
            .catch(Promise.reject);
    };
    /**
     * Retrieves an array of objects from the service
     * @param {?=} params
     * @return {?} The objects retrieved from the service
     */
    DynamicPagerService.prototype.getMultiple = /**
     * Retrieves an array of objects from the service
     * @param {?=} params
     * @return {?} The objects retrieved from the service
     */
    function (params) {
        if (params === void 0) { params = {}; }
        var /** @type {?} */ url = "" + this.serviceUrl + this.buildParamsString(params);
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return /** @type {?} */ (response); })
            .catch(Promise.reject);
    };
    /**
     * Creates an object through the service
     * @param {?=} data The data of the object
     * @return {?} The response returned from the service
     */
    DynamicPagerService.prototype.create = /**
     * Creates an object through the service
     * @param {?=} data The data of the object
     * @return {?} The response returned from the service
     */
    function (data) {
        if (data === void 0) { data = {}; }
        var /** @type {?} */ url = "" + this.serviceUrl;
        return this.http.post(url, data)
            .toPromise()
            .catch(Promise.reject);
    };
    /**
     * Updates an object through the service
     * @param {?=} id
     * @param {?=} data
     * @return {?} The response returned from the service
     */
    DynamicPagerService.prototype.update = /**
     * Updates an object through the service
     * @param {?=} id
     * @param {?=} data
     * @return {?} The response returned from the service
     */
    function (id, data) {
        if (id === void 0) { id = ''; }
        if (data === void 0) { data = {}; }
        var /** @type {?} */ url = this.serviceUrl + "/" + id;
        return this.http.put(url, data)
            .toPromise()
            .catch(Promise.reject);
    };
    /**
     * Deletes a single object from the service
     * @param {?=} id
     * @param {?=} params
     * @return {?} The object retrieved from the service
     */
    DynamicPagerService.prototype.delete = /**
     * Deletes a single object from the service
     * @param {?=} id
     * @param {?=} params
     * @return {?} The object retrieved from the service
     */
    function (id, params) {
        if (id === void 0) { id = ''; }
        if (params === void 0) { params = {}; }
        var /** @type {?} */ url = this.serviceUrl + "/" + id + this.buildParamsString(params);
        return this.http.delete(url)
            .toPromise()
            .catch(Promise.reject);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    DynamicPagerService.prototype.buildParamsString = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        var /** @type {?} */ paramsString = "";
        for (var /** @type {?} */ key in params) {
            if (params.hasOwnProperty(key)) {
                paramsString += "" + (paramsString.length ? '&' : '?') + key + "=" + params[key];
            }
        }
        return paramsString;
    };
    DynamicPagerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DynamicPagerService.ctorParameters = function () { return [
        { type: HttpClient, },
    ]; };
    return DynamicPagerService;
}());
export { DynamicPagerService };
function DynamicPagerService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DynamicPagerService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DynamicPagerService.ctorParameters;
    /** @type {?} */
    DynamicPagerService.prototype.serviceUrl;
    /** @type {?} */
    DynamicPagerService.prototype.http;
}
//# sourceMappingURL=dynamic-pager.service.js.map