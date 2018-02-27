import { Component, EventEmitter, Input, Output, ViewChild, forwardRef, } from '@angular/core';
import { Guid } from '@cisco-ngx/cui-utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CuiInputOptions, CuiInputValidation, } from './cui-input-options';
/**
 * Component for a form input using CiscoUI
 */
var CuiInputComponent = (function () {
    function CuiInputComponent() {
        /**
             * The type of input (text, textarea, number, switch,
             * email, password, tel, date, month, week, time)
             */
        this.type = 'text';
        /**
             * Optional validation options
             */
        this.options = new CuiInputOptions({});
        /**
             * Available choices for a radio input or checkboxes (name, value)
             */
        this.items = [];
        /**
             * Event emitted when the input's value is changed
             * @Deprecated use ngModelChange
             */
        this.modelChange = new EventEmitter();
        /**
             * GUID for the input's id attribute
             */
        this.guid = Guid.generate();
        this.maxLengthString = '';
        this.propagateChange = function (_) { };
    }
    CuiInputComponent.prototype.writeValue = function (value) {
        this.model = value;
    };
    CuiInputComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CuiInputComponent.prototype.registerOnTouched = function () { };
    CuiInputComponent.prototype.ngAfterViewInit = function () {
        if (this.options.autofocus) {
            this.inputElement.focus();
        }
    };
    /**
     * Internal onChange function for the input
     */
    /**
         * Internal onChange function for the input
         */
    CuiInputComponent.prototype.onChange = /**
         * Internal onChange function for the input
         */
    function () {
        if (this.type === 'checkbox') {
            this.model = this.items.filter(function (item) { return item['selected']; }).map(function (item) { return item['value']; });
        }
        this.error = CuiInputValidation.validate(this.options, this.model);
        this.errorMessage = this.error ? this.getErrorMessage() : null;
        if (this.options && this.model && this.options.maxLength) {
            this.maxLengthString = this.model.length + " / " + this.options.maxLength;
        }
        this.propagateChange(this.model);
        this.modelChange.emit(this.model);
    };
    CuiInputComponent.prototype.hasError = function (error) {
        return this.error = error;
    };
    CuiInputComponent.prototype.getErrorMessage = function () {
        var _this = this;
        switch (this.type) {
            case 'text':
            case 'textarea':
            case 'email':
            case 'tel':
            case 'password':
                break;
            default:
                return;
        }
        var errorMessage = this.options.errorMessages.find(function (error) { return error.type === _this.error; });
        if (!errorMessage) {
            return null;
        }
        return typeof errorMessage.message === 'function' ?
            errorMessage.message() : errorMessage.message;
    };
    CuiInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-input',
                    template: "<div class=\"form-group\" [ngClass]=\"{'form-group--helper': options.helperText || errorMessage, 'input--invalid' : error}\" *ngIf=\"type !== 'switch'\"> <div class=\"form-group__text\" *ngIf=\"type !== 'radio' && type !== 'checkbox'\"> <input #inputFocus *ngIf=\"type !== 'number' && type !== 'textarea'\" id=\"input-{{guid}}\" [(ngModel)]=\"model\" [pattern]=\"options.match\" type=\"{{type}}\" [required]=\"options.required\" (ngModelChange)=\"onChange()\"> <input #inputFocus *ngIf=\"type === 'number'\" id=\"input-{{guid}}\" [(ngModel)]=\"model\" [min]=\"options.min\" [max]=\"options.max\" [step]=\"options.step\" type=\"number\" [required]=\"options.required\" (ngModelChange)=\"onChange()\"> <textarea #inputFocus *ngIf=\"type === 'textarea'\" id=\"input-{{guid}}\" [(ngModel)]=\"model\" [pattern]=\"options.match\" [rows]=\"options.rows\" [required]=\"options.required\" (ngModelChange)=\"onChange()\"></textarea> <label for=\"input={{guid}}\" *ngIf=\"label\">{{label}}</label> <div class=\"required-block\" *ngIf=\"options.required\"> <span class=\"icon-asterisk\" title=\"{{options.helperText}}\"></span> </div> </div> <div *ngIf=\"type === 'radio'\"> <label class=\"radio radio--alt\" *ngFor=\"let item of items\"> <input type=\"radio\" [value]=\"item['value']\" [(ngModel)]=\"model\" (ngModelChange)=\"onChange()\"> <span class=\"radio__input\"></span> <span class=\"radio__label\">{{item['name']}}</span> </label> <div class=\"clearfix\"></div> </div> <div *ngIf=\"type === 'checkbox'\"> <label class=\"checkbox\" *ngFor=\"let item of items\"> <input type=\"checkbox\" [(ngModel)]=\"item['selected']\" (ngModelChange)=\"onChange()\"> <span class=\"checkbox__input\"></span> <span class=\"checkbox__label\">{{item['name']}}</span> </label> </div> <div *ngIf=\"options.helperText && (!errorMessage || !model)\" class=\"help-block text-{{options.helperLevel}}\" (ngModelChange)=\"onChange()\"> <span [ngClass]=\"{'icon-exclamation-triangle': options.helperLevel === 'warning', 'icon-error': options.helperLevel === 'danger', 'icon-info-circle': options.helperLevel === 'info', 'icon-check': options.helperLevel === 'success'}\"></span> <span>{{options.helperText}}</span> </div> <div *ngIf=\"model && error && errorMessage\" class=\"help-block text-danger\"> <span class=\"icon-error\"></span> <span>{{errorMessage}}</span> </div> </div> <div *ngIf=\"options && model && options.maxLength && (type === 'text' || type === 'textarea')\"> <span class=\"pull-right half-margin-right text-muted\">{{maxLengthString}}</span> <div class=\"clearfix\"></div> </div> <label class=\"switch\" *ngIf=\"type === 'switch'\"> <input type=\"checkbox\" [(ngModel)]=\"model\" (ngModelChange)=\"onChange()\"> <span class=\"switch__input\"> <span class=\"{{options.leftIcon}}\" *ngIf=\"options.leftIcon\"></span> <span class=\"{{options.rightIcon}}\" *ngIf=\"options.rightIcon\"></span> </span> <span class=\"switch__label\" *ngIf=\"label\">{{label}}</span> </label>",
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return CuiInputComponent; }),
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiInputComponent.ctorParameters = function () { return []; };
    CuiInputComponent.propDecorators = {
        "model": [{ type: Input },],
        "type": [{ type: Input },],
        "label": [{ type: Input },],
        "options": [{ type: Input },],
        "items": [{ type: Input },],
        "modelChange": [{ type: Output },],
        "inputElement": [{ type: ViewChild, args: ['inputFocus',] },],
    };
    return CuiInputComponent;
}());
export { CuiInputComponent };
//# sourceMappingURL=cui-input.component.js.map