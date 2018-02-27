import { Component, ElementRef, forwardRef, Input, Renderer2, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, } from '@angular/forms';
import { castArray } from 'lodash-es';
var ENTER = 'Enter';
var CuiChipsComponent = (function () {
    function CuiChipsComponent(renderer) {
        this.renderer = renderer;
        this.max = Number.MAX_VALUE;
        this.placeholder = '';
        this.allowDuplicates = true;
        this.inputText = '';
        this.chips = [];
        this.dupDisable = false;
        this.propagateChange = function (_) { };
    }
    CuiChipsComponent.prototype.registerOnTouched = function () { };
    CuiChipsComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CuiChipsComponent.prototype.writeValue = function (value) {
        this.chips = castArray(value);
    };
    CuiChipsComponent.prototype.validate = function () {
        return this.required && !this.chips.length ? {
            requiredError: { valid: false },
        } : null;
    };
    CuiChipsComponent.prototype.onAdd = function () {
        if (this.inputText !== '' &&
            this.chips.length < this.max &&
            // fulfill option to restrict duplicate occurrences
            (this.allowDuplicates || !this.hasDups())) {
            this.chips.push(this.inputText);
            this.propagateChange(this.chips);
            this.inputText = '';
            this.checkValidity();
            // keep input focused after clicking Add button
            this.inputRef.nativeElement.focus();
        }
    };
    CuiChipsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.renderer.listen(this.inputRef.nativeElement, 'keypress', function (event) {
            if (event.key === ENTER) {
                _this.onAdd();
            }
        });
        this.renderer.listen(this.inputRef.nativeElement, 'blur', this.checkValidity.bind(this));
    };
    CuiChipsComponent.prototype.onLabelsChange = function () {
        this.checkValidity();
        this.propagateChange(this.chips);
    };
    CuiChipsComponent.prototype.onInputTextChange = function () {
        if (!this.allowDuplicates) {
            this.dupDisable = this.hasDups();
        }
    };
    CuiChipsComponent.prototype.checkValidity = function () {
        if (!this.chips.length && this.required) {
            this.renderer.addClass(this.inputRef.nativeElement, 'ng-invalid');
        }
        else {
            this.renderer.removeClass(this.inputRef.nativeElement, 'ng-invalid');
        }
    };
    CuiChipsComponent.prototype.hasDups = function () {
        return this.chips.includes(this.inputText);
    };
    CuiChipsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-chips',
                    template: "<div class=\"form-group\"> <div class=\"form-group__text\"> <input type=\"text\" #input [(ngModel)]=\"inputText\" [placeholder]=\"placeholder\" (ngModelChange)=\"onInputTextChange()\"> <label [innerHtml]=\"label\"></label> <div class=\"required-block\" *ngIf=\"required\"> <span class=\"icon-asterisk\" title=\"This is a required field\"></span> </div> <button cuiButton color=\"primary\" animated=\"true\" small=\"true\" [disabled]=\"!inputText || chips.length >= max || dupDisable\" (click)=\"onAdd()\"> <span>Add</span> </button> </div> </div> <cui-labels [(ngModel)]=\"chips\" (ngModelChange)=\"onLabelsChange()\"></cui-labels> ",
                    styles: ["button { order: 4; margin-bottom: 5px; } "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return CuiChipsComponent; }),
                            multi: true,
                        },
                        {
                            provide: NG_VALIDATORS,
                            useExisting: forwardRef(function () { return CuiChipsComponent; }),
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiChipsComponent.ctorParameters = function () { return [
        { type: Renderer2, },
    ]; };
    CuiChipsComponent.propDecorators = {
        "label": [{ type: Input },],
        "required": [{ type: Input },],
        "max": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "allowDuplicates": [{ type: Input },],
        "inputRef": [{ type: ViewChild, args: ['input',] },],
    };
    return CuiChipsComponent;
}());
export { CuiChipsComponent };
//# sourceMappingURL=cui-chips.component.js.map