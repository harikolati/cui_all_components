/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
/**
 * @return {?}
 */
function _window() {
    // return the global native browser window object
    return window;
}
var WindowRefService = (function () {
    function WindowRefService() {
    }
    Object.defineProperty(WindowRefService.prototype, "nativeWindow", {
        get: /**
         * @return {?}
         */
        function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    WindowRefService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    WindowRefService.ctorParameters = function () { return []; };
    return WindowRefService;
}());
export { WindowRefService };
function WindowRefService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WindowRefService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WindowRefService.ctorParameters;
}
//# sourceMappingURL=window-ref.service.js.map