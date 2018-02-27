import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CuiToastOptions } from './cui-toast-options';
import { find as _find } from 'lodash-es';
var CuiToastComponent = (function () {
    function CuiToastComponent() {
        this.toastIsVisible = new EventEmitter();
        this.toasts = [];
    }
    /**
     * Pushes a created toast to the screen
     * @param  {CuiToastOptions} toast
     */
    /**
         * Pushes a created toast to the screen
         * @param  {CuiToastOptions} toast
         */
    CuiToastComponent.prototype.pushToast = /**
         * Pushes a created toast to the screen
         * @param  {CuiToastOptions} toast
         */
    function (toast) {
        this.toasts.push(toast);
        if (this.autoHide) {
            setTimeout(this.removeToast.bind(this, toast), this.autoHide);
        }
        this.toastIsVisible.emit(true);
    };
    /**
     * Adds a toast to the screen
     * @param severity The severity of the toast
     * @param title    The title to display
     * @param message  The message to display
     * @param padding  The padding of the toast
     * @returns The toast object
     */
    /**
         * Adds a toast to the screen
         * @param severity The severity of the toast
         * @param title    The title to display
         * @param message  The message to display
         * @param padding  The padding of the toast
         * @returns The toast object
         */
    CuiToastComponent.prototype.addToast = /**
         * Adds a toast to the screen
         * @param severity The severity of the toast
         * @param title    The title to display
         * @param message  The message to display
         * @param padding  The padding of the toast
         * @returns The toast object
         */
    function (severity, title, message, padding) {
        if (padding === void 0) { padding = 'regular'; }
        var toast = new CuiToastOptions(severity, title, message, padding);
        this.pushToast(toast);
        return toast;
    };
    /**
     * Removes a toast from the screen
     * @param toastToRemove The toast to remove
     */
    /**
         * Removes a toast from the screen
         * @param toastToRemove The toast to remove
         */
    CuiToastComponent.prototype.removeToast = /**
         * Removes a toast from the screen
         * @param toastToRemove The toast to remove
         */
    function (toastToRemove) {
        var _this = this;
        var toast = _find(this.toasts, function (toastOptions) { return toastOptions.guid === toastToRemove.guid; });
        if (toast) {
            toast.hide();
            setTimeout(function () {
                _this.toasts.splice(_this.toasts.indexOf(toast), 1);
                _this.toastIsVisible.emit(false);
            }, 500);
        }
    };
    CuiToastComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-toast',
                    template: "<div class=\"cui-toasts\"> <div *ngFor=\"let toast of toasts; let i = index\" class=\"cui-toast toast toast--{{toast.padding}}\" [ngClass]=\"{'show': toast.popped}\"> <div class=\"toast__icon text--{{toast.severity}}\" [ngClass]=\"{ 'icon-error': toast.severity === 'danger', 'icon-warning': toast.severity === 'warning', 'icon-check': toast.severity === 'success', 'icon-info': toast.severity === 'info' }\"> </div> <div class=\"toast__body\"> <div class=\"toast__title\" [innerHTML]=\"toast.title\"></div> <div class=\"toast__message\" [innerHTML]=\"toast.message\"></div> </div> <span class=\"close-button link icon-close\" (click)=\"removeToast(toast)\"></span> </div> </div> ",
                    styles: [".cui-toasts { position: fixed !important; right: .5rem; bottom: .5rem; width: 300px; z-index: 2000; } .cui-toast { position: relative; opacity: 0; transition: opacity 500ms linear; } .cui-toast.show { display: flex !important; opacity: 1; transition: opacity 500ms linear; } .cui-toast .close-button { position: absolute; top: .25rem; right: .375rem; } .toast__body { word-break: break-word; } .toast__icon { float: left; } "],
                },] },
    ];
    /** @nocollapse */
    CuiToastComponent.ctorParameters = function () { return []; };
    CuiToastComponent.propDecorators = {
        "autoHide": [{ type: Input },],
        "toastIsVisible": [{ type: Output },],
    };
    return CuiToastComponent;
}());
export { CuiToastComponent };
//# sourceMappingURL=cui-toast.component.js.map