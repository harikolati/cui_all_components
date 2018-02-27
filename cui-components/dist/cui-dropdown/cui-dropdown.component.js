import { Component, Input, ElementRef } from '@angular/core';
var CuiDropdownComponent = (function () {
    function CuiDropdownComponent(elementRef) {
        this.elementRef = elementRef;
        /**
             * The type of button (default, primary, secondary, white, negative, success)
             */
        this.type = 'default';
        /**
             * Whether the button is small
             */
        this.small = false;
        /**
             * Whether the button is wide
             */
        this.wide = false;
        /**
             * Optional alternate value to show in the center of the gauge
             */
        this.actions = [];
        this.active = false;
        this.colorClass = '';
        this.sizeClass = '';
    }
    CuiDropdownComponent.prototype.ngOnInit = function () {
        this.formatActions();
        this.setClassStrings();
    };
    CuiDropdownComponent.prototype.ngOnChanges = function () {
        this.formatActions();
        this.setClassStrings();
    };
    CuiDropdownComponent.prototype.doBlur = function (event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.active = false;
        }
    };
    CuiDropdownComponent.prototype.setClassStrings = function () {
        this.colorClass = this.type === 'default' ? '' : "btn--" + this.type;
        this.sizeClass = (this.small ? 'btn--small' : '') + " " + (this.wide ? 'btn--wide' : '');
    };
    CuiDropdownComponent.prototype.formatActions = function () {
        if (this.actions[0] && !Array.isArray(this.actions[0])) {
            this.actions = [this.actions];
        }
    };
    CuiDropdownComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-dropdown',
                    template: "<div class=\"dropdown dropdown--animated\" tabindex=\"-1\" [ngClass]=\"{'active': active}\" (click)=\"active = !active\" (blur)=\"doBlur($event)\"> <button class=\"btn btn--dropdown {{colorClass}} {{sizeClass}}\">{{label}}</button> <div class=\"dropdown__menu\"> <span *ngFor=\"let actionGroup of actions; index as i\"> <div *ngIf=\"i > 0\" class=\"dropdown__divider\"></div> <a *ngFor=\"let action of actionGroup\" (click)=\"action.onClick()\">{{action.label}}</a> </span> </div> </div>",
                    host: {
                        '(document:click)': 'doBlur($event)'
                    },
                },] },
    ];
    /** @nocollapse */
    CuiDropdownComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    CuiDropdownComponent.propDecorators = {
        "label": [{ type: Input },],
        "type": [{ type: Input },],
        "small": [{ type: Input },],
        "wide": [{ type: Input },],
        "actions": [{ type: Input },],
    };
    return CuiDropdownComponent;
}());
export { CuiDropdownComponent };
//# sourceMappingURL=cui-dropdown.component.js.map