import { Component, Input, } from '@angular/core';
import { CuiAlertService } from './cui-alert.service';
import { get, assignIn, defaultTo } from 'lodash-es';
var CuiAlertComponent = (function () {
    function CuiAlertComponent(alertService) {
        var _this = this;
        this.alertService = alertService;
        /**
             * Options object for cui-alert
             */
        this.options = {};
        /**
             * Whether to listen for global alerts from the alert service
             */
        this.global = false;
        this.alert = {
            msg: '',
            severity: 'info',
            visible: false,
        };
        this.alertSubscribe = this.alertService.getNextAlert()
            .subscribe(function (alert) {
            if (_this.global) {
                _this.options.show(alert.msg, alert.severity);
            }
        });
    }
    /**
     * Returns the color class string for the alert
     * @returns The color class string
     */
    /**
         * Returns the color class string for the alert
         * @returns The color class string
         */
    CuiAlertComponent.prototype.getColorClass = /**
         * Returns the color class string for the alert
         * @returns The color class string
         */
    function () {
        var alt = get(this.options, 'alt', 0);
        var altClass = '';
        switch (alt) {
            case 1:
                altClass = '-alt';
                break;
            case 2:
                altClass = '-alt2';
                break;
            default:
                altClass = '';
                break;
        }
        switch (this.alert.severity) {
            case 'success':
                return "alert--success" + altClass;
            case 'warning':
                return "alert--warning" + altClass;
            case 'danger':
                return "alert--danger" + altClass;
            default:
                return "alert--info" + altClass;
        }
    };
    /**
     * Returns the class string for the alert's icon
     * @returns The icon string
     */
    /**
         * Returns the class string for the alert's icon
         * @returns The icon string
         */
    CuiAlertComponent.prototype.getIconClass = /**
         * Returns the class string for the alert's icon
         * @returns The icon string
         */
    function () {
        switch (this.alert.severity) {
            case 'success':
                return 'icon-check';
            case 'warning':
                return 'icon-exclamation-triangle';
            case 'danger':
                return 'icon-error';
            default:
                return 'icon-info-circle';
        }
    };
    CuiAlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = assignIn(this.options, {
            show: function (msg, severity) {
                _this.alert.message = msg;
                _this.alert.severity = severity;
                _this.alert.visible = true;
            },
            hide: function () {
                _this.alert.visible = false;
            },
        });
        this.options.alt = defaultTo(this.options.alt, 0);
        this.options.closeButton = defaultTo(this.options.closeButton, true);
    };
    CuiAlertComponent.prototype.ngOnDestroy = function () {
        this.alertSubscribe.unsubscribe();
    };
    CuiAlertComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-alert',
                    template: "<div class=\"alert {{ getColorClass() }} fade-and-slide-top text-left\" *ngIf=\"alert.visible\"> <div class=\"alert__icon {{ getIconClass() }}\"></div> <div class=\"alert__message\" [innerHtml]=\"alert.message\"></div> <div class=\"alert__close icon-close\" (click)=\"options.hide()\" *ngIf=\"options.closeButton\"></div> </div> ",
                },] },
    ];
    /** @nocollapse */
    CuiAlertComponent.ctorParameters = function () { return [
        { type: CuiAlertService, },
    ]; };
    CuiAlertComponent.propDecorators = {
        "options": [{ type: Input },],
        "global": [{ type: Input },],
    };
    return CuiAlertComponent;
}());
export { CuiAlertComponent };
//# sourceMappingURL=cui-alert.component.js.map