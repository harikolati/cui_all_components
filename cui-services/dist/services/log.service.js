/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
/** @enum {number} */
var LogLevel = {
    INFO: 0,
    DEBUG: 1,
    WARNING: 2,
    ERROR: 3,
    VERBOSE: 4,
};
export { LogLevel };
var LogService = (function () {
    function LogService() {
    }
    /**
     * Logs a message to the console
     * @param {?} message The message to log
     * @param {?=} level   The level to log the message under
     * @return {?} The formatted message sent to the console
     */
    LogService.prototype.log = /**
     * Logs a message to the console
     * @param {?} message The message to log
     * @param {?=} level   The level to log the message under
     * @return {?} The formatted message sent to the console
     */
    function (message, level) {
        if (level === void 0) { level = 0 /* INFO */; }
        var /** @type {?} */ errorString = this.getFormattedErrorString(message, level);
        switch (level) {
            case 0 /* INFO */:
                console.log(errorString);
                break;
            case 2 /* WARNING */:
                console.warn(errorString);
                break;
            case 3 /* ERROR */:
                console.error(errorString);
                break;
            default:
                console.log(errorString);
                break;
        }
        return errorString;
    };
    /**
     * Logs a message to the console at the INFO level
     * @param {?} message The message to log
     * @return {?} The formatted message sent to the console
     */
    LogService.prototype.info = /**
     * Logs a message to the console at the INFO level
     * @param {?} message The message to log
     * @return {?} The formatted message sent to the console
     */
    function (message) {
        return this.log(message, 0 /* INFO */);
    };
    /**
     * Logs a message to the console at the DEBUG level
     * @param {?} message The message to log
     * @return {?} The formatted message sent to the console
     */
    LogService.prototype.debug = /**
     * Logs a message to the console at the DEBUG level
     * @param {?} message The message to log
     * @return {?} The formatted message sent to the console
     */
    function (message) {
        return this.log(message, 1 /* DEBUG */);
    };
    /**
     * Logs a message to the console at the WARNING level
     * @param {?} message The message to log
     * @return {?} The formatted message sent to the console
     */
    LogService.prototype.warn = /**
     * Logs a message to the console at the WARNING level
     * @param {?} message The message to log
     * @return {?} The formatted message sent to the console
     */
    function (message) {
        return this.log(message, 2 /* WARNING */);
    };
    /**
     * Logs a message to the console at the ERROR level
     * @param {?} message The message to log
     * @return {?} The formatted message sent to the console
     */
    LogService.prototype.error = /**
     * Logs a message to the console at the ERROR level
     * @param {?} message The message to log
     * @return {?} The formatted message sent to the console
     */
    function (message) {
        return this.log(message, 3 /* ERROR */);
    };
    /**
     * Logs a message to the console at the VERBOSE level
     * @param {?} message The message to log
     * @return {?} The formatted message sent to the console
     */
    LogService.prototype.verbose = /**
     * Logs a message to the console at the VERBOSE level
     * @param {?} message The message to log
     * @return {?} The formatted message sent to the console
     */
    function (message) {
        return this.log(message, 4 /* VERBOSE */);
    };
    /**
     * @param {?=} level
     * @return {?}
     */
    LogService.prototype.getLevelDisplayString = /**
     * @param {?=} level
     * @return {?}
     */
    function (level) {
        if (level === void 0) { level = 0 /* INFO */; }
        switch (level) {
            case 4 /* VERBOSE */:
                return 'verbose';
            case 3 /* ERROR */:
                return 'error';
            case 2 /* WARNING */:
                return 'warning';
            case 1 /* DEBUG */:
                return 'debug';
            default:
                return 'info';
        }
    };
    /**
     * @param {?} message
     * @param {?=} level
     * @return {?}
     */
    LogService.prototype.getFormattedErrorString = /**
     * @param {?} message
     * @param {?=} level
     * @return {?}
     */
    function (message, level) {
        if (level === void 0) { level = 0 /* INFO */; }
        var /** @type {?} */ levelDisplayString = this.getLevelDisplayString(level);
        return levelDisplayString + ": " + message;
    };
    LogService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LogService.ctorParameters = function () { return []; };
    return LogService;
}());
export { LogService };
function LogService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    LogService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    LogService.ctorParameters;
}
//# sourceMappingURL=log.service.js.map