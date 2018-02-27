import { Component, ContentChild, Input } from '@angular/core';
import { CuiInputDirective } from './cui-input.directive';
import { get, invoke } from 'lodash-es';
var CuiFormFieldComponent = (function () {
    function CuiFormFieldComponent() {
        this.required = false;
        this.model = '';
    }
    CuiFormFieldComponent.prototype.ngAfterContentInit = function () {
        this.refresh();
        if (this.input) {
            this.changesSub = this.input.onChanges.subscribe(this.refresh.bind(this));
            this.initFormSubs();
        }
    };
    CuiFormFieldComponent.prototype.initFormSubs = function () {
        if (get(this, 'input.control')) {
            this.statusChangeSub = this.input.control.statusChanges.subscribe(this.onStatusChange.bind(this));
        }
    };
    CuiFormFieldComponent.prototype.refresh = function (input) {
        this.maxlength = get(this, 'input.maxlength');
        if (input) {
            this.input = input;
            this.required = input.required;
            this.model = get(this, 'input.ngModel', '');
        }
        else {
            this.required = get(this, 'input.required');
        }
        if (get(this, 'input.control')) {
            invoke(this, 'statusChangeSub.unsubscribe');
            this.initFormSubs();
        }
    };
    CuiFormFieldComponent.prototype.onStatusChange = function (change) {
        this.setError(change === 'VALID');
    };
    CuiFormFieldComponent.prototype.setError = function (valid) {
        if (!valid) {
            this.hasError = true;
        }
        else {
            this.hasError = false;
        }
    };
    CuiFormFieldComponent.prototype.ngOnDestroy = function () {
        invoke(this, 'changesSub.unsubscribe');
        invoke(this, 'statusChangeSub.unsubscribe');
    };
    CuiFormFieldComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-form-field',
                    template: "<div class=\"form-group\"> <div class=\"form-group__text\"> <ng-content select=\"[cuiInput]\" #input></ng-content> <label for=\"text4\" [innerHtml]=\"label\"></label> <div class=\"required-block\" *ngIf=\"required\"> <span class=\"icon-asterisk\" title=\"This is a required field\"></span> </div> </div> </div> <div class=\"pull-right text-muted\" *ngIf=\"maxlength\"> <span [innerHtml]=\"model.length + ' / ' + maxlength\"></span> </div> <div class=\"help-block\" *ngIf=\"hasError\"> <ng-content select=\"[cuiError]\"></ng-content> </div> ",
                    styles: [""],
                },] },
    ];
    /** @nocollapse */
    CuiFormFieldComponent.ctorParameters = function () { return []; };
    CuiFormFieldComponent.propDecorators = {
        "input": [{ type: ContentChild, args: [CuiInputDirective,] },],
        "label": [{ type: Input },],
    };
    return CuiFormFieldComponent;
}());
export { CuiFormFieldComponent };
//# sourceMappingURL=cui-form-field.component.js.map