import { Component, Input, Output, EventEmitter, } from '@angular/core';
var CuiSortComponent = (function () {
    function CuiSortComponent() {
        this.sortDirection = 'asc';
        this.options = [];
        this.toggleSortDirUpdate = new EventEmitter();
        this.optionChange = new EventEmitter();
    }
    CuiSortComponent.prototype.toggleSortDir = function () {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.optionSelected = this.optionSelected;
        this.toggleSortDirUpdate
            .emit({ sortDirection: this.sortDirection, sortValue: this.optionSelected });
    };
    CuiSortComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-sort',
                    template: "<div class=\"input-group\"> <div class=\"input-group__prefix\"> <a (click)=\"toggleSortDir();\" class=\"link\" data-auto-id=\"sort-anchor\"> <span [class.icon-sort-amount-asc]=\"sortDirection === 'asc'\" [class.icon-sort-amount-desc]=\"sortDirection === 'desc'\"></span> </a> </div> <div class=\"input-group__select\"> <div class=\"select select--inline\"> <select (change)=\"optionChange.emit({sortDirection:sortDirection,sortValue:optionSelected})\" attr.data-auto-id=\"sort-select-{{sortbyID}}\" id=\"sortby-{{sortbyID}}\" [(ngModel)]=\"optionSelected\"  name=\"sortby\"> <option *ngFor=\"let option of options\" [value]=\"optionsValue ? option[optionsValue] : option\">{{optionsLabel ? option[optionsLabel] : option}}</option> </select> </div> </div> </div> ",
                    styles: [".input-group .input-group__prefix { margin-right: -5px; } "],
                },] },
    ];
    /** @nocollapse */
    CuiSortComponent.ctorParameters = function () { return []; };
    CuiSortComponent.propDecorators = {
        "sortDirection": [{ type: Input },],
        "options": [{ type: Input },],
        "optionsLabel": [{ type: Input },],
        "optionsValue": [{ type: Input },],
        "sortbyID": [{ type: Input },],
        "optionSelected": [{ type: Input },],
        "toggleSortDirUpdate": [{ type: Output },],
        "optionChange": [{ type: Output },],
    };
    return CuiSortComponent;
}());
export { CuiSortComponent };
//# sourceMappingURL=cui-sort.component.js.map