import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
/**
 * Service for alerts
 */
var CuiAlertService = (function () {
    function CuiAlertService() {
        this.nextAlert = new Subject();
    }
    CuiAlertService.prototype.postAlert = function (severity, msg) {
        if (severity === void 0) { severity = ''; }
        if (msg === void 0) { msg = ''; }
        this.nextAlert.next({ severity: severity, msg: msg });
    };
    CuiAlertService.prototype.getNextAlert = function () {
        return this.nextAlert.asObservable();
    };
    CuiAlertService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CuiAlertService.ctorParameters = function () { return []; };
    return CuiAlertService;
}());
export { CuiAlertService };
//# sourceMappingURL=cui-alert.service.js.map