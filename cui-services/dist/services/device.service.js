/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { Mobile, Language } from "@cisco-ngx/cui-utils";
/** @enum {number} */
var DeviceOS = {
    WINDOWS_10: 0,
    WINDOWS_8_1: 1,
    WINDOWS_8: 2,
    WINDOWS_7: 3,
    WINDOWS_VISTA: 4,
    WINDOWS_SERVER_2003: 5,
    WINDOWS_XP: 6,
    WINDOWS_2000: 7,
    WINDOWS_ME: 8,
    WINDOWS_98: 9,
    WINDOWS_95: 10,
    WINDOWS_NT_4_0: 11,
    WINDOWS_CE: 12,
    WINDOWS_3_11: 13,
    ANDROID: 14,
    OPEN_BSD: 15,
    SUN_OS: 16,
    LINUX: 17,
    IOS: 18,
    MAC_OSX: 19,
    MAC_OS: 20,
    QNX: 21,
    UNIX: 22,
    BE_OS: 23,
    OS_2: 24,
    SEARCH_BOT: 25,
};
export { DeviceOS };
var Device = (function () {
    function Device(os, displayName, regex) {
        this.os = os;
        this.displayName = displayName;
        this.regex = regex;
    }
    return Device;
}());
export { Device };
function Device_tsickle_Closure_declarations() {
    /** @type {?} */
    Device.prototype.version;
    /** @type {?} */
    Device.prototype.mobile;
    /** @type {?} */
    Device.prototype.language;
    /** @type {?} */
    Device.prototype.os;
    /** @type {?} */
    Device.prototype.displayName;
    /** @type {?} */
    Device.prototype.regex;
}
var /** @type {?} */ devices = [
    new Device(0 /* WINDOWS_10 */, 'Windows 10', /(Windows 10.0|Windows NT 10.0)/),
    new Device(1 /* WINDOWS_8_1 */, 'Windows 8.1', /(Windows 8.1|Windows NT 6.3)/),
    new Device(2 /* WINDOWS_8 */, 'Windows 8', /(Windows 8|Windows NT 6.2)/),
    new Device(3 /* WINDOWS_7 */, 'Windows 7', /(Windows 7|Windows NT 6.1)/),
    new Device(4 /* WINDOWS_VISTA */, 'Windows Vista', /Windows NT 6.0/),
    new Device(5 /* WINDOWS_SERVER_2003 */, 'Windows Server 2003', /Windows NT 5.2/),
    new Device(5 /* WINDOWS_SERVER_2003 */, 'Windows Server 2003', /Windows NT 5.2/),
    new Device(6 /* WINDOWS_XP */, 'Windows XP', /(Windows NT 5.1|Windows XP)/),
    new Device(7 /* WINDOWS_2000 */, 'Windows 2000', /(Windows NT 5.0|Windows 2000)/),
    new Device(8 /* WINDOWS_ME */, 'Windows ME', /(Win 9x 4.90|Windows ME)/),
    new Device(9 /* WINDOWS_98 */, 'Windows 98', /(Windows 98|Win98)/),
    new Device(10 /* WINDOWS_95 */, 'Windows 95', /(Windows 95|Win95|Windows_95)/),
    new Device(11 /* WINDOWS_NT_4_0 */, 'Windows NT 4.0', /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/),
    new Device(12 /* WINDOWS_CE */, 'Windows CE', /Windows CE/),
    new Device(13 /* WINDOWS_3_11 */, 'Windows 3.11', /Win16/),
    new Device(14 /* ANDROID */, 'Android', /Android/),
    new Device(15 /* OPEN_BSD */, 'Open BSD', /OpenBSD/),
    new Device(16 /* SUN_OS */, 'Sun OS', /SunOS/),
    new Device(17 /* LINUX */, 'Linux', /(Linux|X11)/),
    new Device(18 /* IOS */, 'iOS', /(iPhone|iPad|iPod)/),
    new Device(19 /* MAC_OSX */, 'Mac OS X', /Mac OS X/),
    new Device(20 /* MAC_OS */, 'Mac OS', /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/),
    new Device(21 /* QNX */, 'QNX', /QNX/),
    new Device(22 /* UNIX */, 'UNIX', /UNIX/),
    new Device(23 /* BE_OS */, 'BeOS', /BeOS/),
    new Device(24 /* OS_2 */, 'OS/2', /OS\/2/),
    new Device(25 /* SEARCH_BOT */, 'Search Bot', /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/),
];
var DeviceService = (function () {
    function DeviceService() {
    }
    /**
     * Retrieves information on the user's device
     * @return {?} The user's device details
     */
    DeviceService.prototype.getDevice = /**
     * Retrieves information on the user's device
     * @return {?} The user's device details
     */
    function () {
        var /** @type {?} */ navigatorAgent = window.navigator.userAgent
            || window.navigator.vendor || window['opera'];
        var /** @type {?} */ navigatorVersion = window.navigator.appVersion;
        var /** @type {?} */ device = devices.find(function (dvc) { return dvc.regex.test(navigatorAgent); });
        if (/Windows/.test(device.displayName)) {
            device.version = /Windows (.*)/.exec(device.displayName)[1];
        }
        switch (device.os) {
            case 19 /* MAC_OSX */:
                device.version = /Mac OS X (10[\.\_\d]+)/.exec(navigatorAgent)[1];
                break;
            case 14 /* ANDROID */:
                device.version = /Android ([\.\_\d]+)/.exec(navigatorAgent)[1];
                break;
            case 18 /* IOS */:
                var /** @type {?} */ version = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigatorVersion);
                device.version = version[1] + "." + version[2] + "." + (parseInt(version[3], 10) || 0);
                break;
        }
        device.mobile = this.isMobile();
        device.language = Language.getPreferred();
        return device;
    };
    /**
     * @return {?}
     */
    DeviceService.prototype.isMobile = /**
     * @return {?}
     */
    function () {
        return Mobile.isMobile();
    };
    /**
     * @return {?}
     */
    DeviceService.prototype.isWindows = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ device = this.getDevice();
        /* tslint:disable-next-line max-line-length ter-max-len */
        return device.os === 0 /* WINDOWS_10 */ || device.os === 1 /* WINDOWS_8_1 */ || device.os === 2 /* WINDOWS_8 */ || device.os === 3 /* WINDOWS_7 */ || device.os === 4 /* WINDOWS_VISTA */ || device.os === 5 /* WINDOWS_SERVER_2003 */ || device.os === 6 /* WINDOWS_XP */ || device.os === 7 /* WINDOWS_2000 */ || device.os === 8 /* WINDOWS_ME */ || device.os === 9 /* WINDOWS_98 */ || device.os === 10 /* WINDOWS_95 */ || device.os === 11 /* WINDOWS_NT_4_0 */ || device.os === 12 /* WINDOWS_CE */ || device.os === 13 /* WINDOWS_3_11 */;
    };
    /**
     * @return {?}
     */
    DeviceService.prototype.isMac = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ device = this.getDevice();
        return device.os === 19 /* MAC_OSX */ || device.os === 20 /* MAC_OS */;
    };
    /**
     * @return {?}
     */
    DeviceService.prototype.isLinux = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ device = this.getDevice();
        return device.os === 17 /* LINUX */ || device.os === 14 /* ANDROID */;
    };
    DeviceService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DeviceService.ctorParameters = function () { return []; };
    return DeviceService;
}());
export { DeviceService };
function DeviceService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    DeviceService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    DeviceService.ctorParameters;
}
//# sourceMappingURL=device.service.js.map