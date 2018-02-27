import { Injectable, Component, ViewChild, } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CuiToastComponent } from './cui-toast.component';
import { CuiToastOptions } from './cui-toast-options';
var CuiToasterService = (function () {
    function CuiToasterService() {
        this.nextToast = new Subject();
        this.removedToast = new Subject();
    }
    /**
     * Adds a toast to the screen
     * @param  {string} severity
     * @param  {string} title
     * @param  {string} message
     * @param  {string} padding
     * @return {CuiToastOptions}
     */
    /**
         * Adds a toast to the screen
         * @param  {string} severity
         * @param  {string} title
         * @param  {string} message
         * @param  {string} padding
         * @return {CuiToastOptions}
         */
    CuiToasterService.prototype.addToast = /**
         * Adds a toast to the screen
         * @param  {string} severity
         * @param  {string} title
         * @param  {string} message
         * @param  {string} padding
         * @return {CuiToastOptions}
         */
    function (severity, title, message, padding) {
        if (severity === void 0) { severity = ''; }
        if (title === void 0) { title = ''; }
        if (message === void 0) { message = ''; }
        if (padding === void 0) { padding = ''; }
        var toast = new CuiToastOptions(severity, title, message, padding);
        this.nextToast.next(toast);
        return toast;
    };
    /**
     * Removes a toast from the screen
     * @param  {CuiToastOptions} toast
     */
    /**
         * Removes a toast from the screen
         * @param  {CuiToastOptions} toast
         */
    CuiToasterService.prototype.removeToast = /**
         * Removes a toast from the screen
         * @param  {CuiToastOptions} toast
         */
    function (toast) {
        this.removedToast.next(toast);
    };
    /**
     * Subscription for getting next toast
     * @return {Observable<CuiToastOptions>}
     */
    /**
         * Subscription for getting next toast
         * @return {Observable<CuiToastOptions>}
         */
    CuiToasterService.prototype.getNextToast = /**
         * Subscription for getting next toast
         * @return {Observable<CuiToastOptions>}
         */
    function () {
        return this.nextToast.asObservable();
    };
    /**
     * Subscription for getting removed toast
     * @return {Observable<CuiToastOptions>}
     */
    /**
         * Subscription for getting removed toast
         * @return {Observable<CuiToastOptions>}
         */
    CuiToasterService.prototype.getRemovedToast = /**
         * Subscription for getting removed toast
         * @return {Observable<CuiToastOptions>}
         */
    function () {
        return this.removedToast.asObservable();
    };
    CuiToasterService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CuiToasterService.ctorParameters = function () { return []; };
    return CuiToasterService;
}());
export { CuiToasterService };
var CuiToasterComponent = (function () {
    function CuiToasterComponent(toastService) {
        var _this = this;
        this.toastService = toastService;
        this.toastSubscribe = this.toastService.getNextToast()
            .subscribe(function (toast) {
            _this.toasts.pushToast(toast);
        });
        this.removedToastSubscribe = this.toastService.getRemovedToast()
            .subscribe(function (toast) {
            _this.toasts.removeToast(toast);
        });
    }
    CuiToasterComponent.prototype.ngOnDestroy = function () {
        this.toastSubscribe.unsubscribe();
        this.removedToastSubscribe.unsubscribe();
    };
    CuiToasterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-toaster',
                    template: '<cui-toast></cui-toast>',
                },] },
    ];
    /** @nocollapse */
    CuiToasterComponent.ctorParameters = function () { return [
        { type: CuiToasterService, },
    ]; };
    CuiToasterComponent.propDecorators = {
        "toasts": [{ type: ViewChild, args: [CuiToastComponent,] },],
    };
    return CuiToasterComponent;
}());
export { CuiToasterComponent };
//# sourceMappingURL=cui-toaster.component.js.map