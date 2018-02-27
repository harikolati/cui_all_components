import { Component, forwardRef, Input, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var CuiLabelsComponent = (function () {
    function CuiLabelsComponent() {
        this.removable = true;
        this.propagateChange = function (_) { };
    }
    CuiLabelsComponent.prototype.remove = function (index) {
        this.data.splice(index, 1);
        this.propagateChange(this.data);
    };
    CuiLabelsComponent.prototype.ngOnInit = function () {
        this.labelClasses = {
            'label--raised': this.raised,
            'label--bordered': this.bordered,
        };
        if (this.color) {
            this.labelClasses["label--" + this.color] = true;
        }
        if (this.size) {
            this.labelClasses["label--" + this.size] = true;
        }
    };
    CuiLabelsComponent.prototype.ngOnChanges = function (changes) {
        if (changes.color || changes.size) {
            this.labelClasses = {
                'label--raised': this.raised,
                'label--bordered': this.bordered,
            };
            this.labelClasses["label--" + this.color] = true;
            this.labelClasses["label--" + this.size] = true;
        }
        if (changes.raised) {
            this.labelClasses['label--raised'] = this.raised;
        }
        if (changes.bordered) {
            this.labelClasses['label--bordered'] = this.bordered;
        }
    };
    CuiLabelsComponent.prototype.writeValue = function (value) {
        this.data = value;
    };
    CuiLabelsComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CuiLabelsComponent.prototype.registerOnTouched = function () { };
    CuiLabelsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-labels',
                    template: "<div *ngIf=\"data?.length\"> <span class=\"label\" *ngFor=\"let l of data; let i = index\" [ngClass]=\"labelClasses\" [class]=\"labelClass\"> <span [innerHtml]=\"labelKey ? l[labelKey] : l\"></span> <span *ngIf=\"removable\" class=\"icon-close\" (click)=\"remove(i)\"></span> </span> </div> ",
                    styles: [""],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return CuiLabelsComponent; }),
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiLabelsComponent.ctorParameters = function () { return []; };
    CuiLabelsComponent.propDecorators = {
        "removable": [{ type: Input },],
        "raised": [{ type: Input },],
        "bordered": [{ type: Input },],
        "size": [{ type: Input },],
        "color": [{ type: Input },],
        "labelKey": [{ type: Input },],
    };
    return CuiLabelsComponent;
}());
export { CuiLabelsComponent };
//# sourceMappingURL=cui-labels.component.js.map