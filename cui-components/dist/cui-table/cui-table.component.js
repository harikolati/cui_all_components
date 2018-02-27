import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CuiTableOptions } from './cui-table-options';
import { StaticPagerService } from '@cisco-ngx/cui-services';
var CuiTableComponent = (function () {
    function CuiTableComponent(staticPagerService) {
        this.staticPagerService = staticPagerService;
        /**
             * (optional) Number of items per page
             */
        this.limit = 0;
        /**
             * (optional) The current page index
             */
        this.offset = 0;
        /**
             * Whether all items in the table are selected
             */
        this.allSelected = false;
        /**
             * Event emitted when the sorting has changed
             */
        this.onSortingChanged = new EventEmitter();
        /**
             * Event emitted when the items selected has changed
             */
        this.onSelectionChanged = new EventEmitter();
        /**
             * Event emitted when the table click view  happens
             */
        this.onTableRowClicked = new EventEmitter();
    }
    CuiTableComponent.prototype.ngOnInit = function () {
        for (var _i = 0, _a = this.options.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (column.sorting && !this.options.dynamicData) {
                column.sortDirection = 'desc';
                this.sortTable(column);
            }
        }
    };
    /**
     * Toggles selection of all items
     */
    /**
         * Toggles selection of all items
         */
    CuiTableComponent.prototype.toggleAllSelected = /**
         * Toggles selection of all items
         */
    function () {
        this.allSelected = !this.allSelected;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var item = _a[_i];
            item['tableSelected'] = this.allSelected;
        }
        this.onSelectionChanged.emit(this.getSelectedItems());
    };
    /**
     * Sorts the table by a column
     * @param  {CuiTableColumnOption} sortColumn The column to sort by
     */
    /**
         * Sorts the table by a column
         * @param  {CuiTableColumnOption} sortColumn The column to sort by
         */
    CuiTableComponent.prototype.sortTable = /**
         * Sorts the table by a column
         * @param  {CuiTableColumnOption} sortColumn The column to sort by
         */
    function (sortColumn) {
        if (!sortColumn.sortable) {
            return;
        }
        this.data = this.staticPagerService.sort(sortColumn, this.options.columns, this.data);
        this.onSortingChanged.emit(sortColumn);
    };
    CuiTableComponent.prototype.onItemSelectedChange = function () {
        this.onSelectionChanged.emit(this.getSelectedItems());
        this.allSelected = this.data.filter(function (item) {
            return item['tableSelected'];
        }).length === this.data.length;
    };
    CuiTableComponent.prototype.getSelectedItems = function () {
        return this.data.filter(function (item) { return item['tableSelected']; });
    };
    CuiTableComponent.prototype.getDisplayedData = function () {
        if (!this.options.dynamicData) {
            return this.staticPagerService.getPagedData(this.data, this.offset, this.limit);
        }
        return this.data;
    };
    CuiTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-table',
                    template: "<div class=\"responsive-table\"> <table class=\"table\" [ngClass]=\"{'table--bordered': options.bordered, 'table--nostripes': !options.striped, 'table--hover': options.hover, 'table--wrap': options.wrapText, 'table--compressed': options.padding === 'compressed', 'table--loose': options.padding === 'loose'}\"> <thead> <tr> <th *ngIf=\"options.selectable\"> <label class=\"checkbox\"> <input type=\"checkbox\" [(ngModel)]=\"allSelected\" (click)=\"toggleAllSelected()\"/> <span class=\"checkbox__input\"></span> </label> </th> <th *ngFor=\"let column of options.columns\" [ngClass]=\"{'sortable': column.sortable, 'sorted': column.sorting}\" [ngStyle]=\"{'width': column.width}\" (click)=\"sortTable(column)\"> <span>{{column.name}}</span> <span [ngClass]=\"{'icon-chevron-down': column.sortDirection === 'asc', 'icon-chevron-up': column.sortDirection === 'desc'}\" *ngIf=\"column.sorting\"></span> </th> </tr> </thead> <tbody> <ng-container *ngFor=\"let item of getDisplayedData()\"> <tr> <td *ngIf=\"options.selectable\"> <label class=\"checkbox\"> <input type=\"checkbox\" [(ngModel)]=\"item.tableSelected\" (ngModelChange)=\"onItemSelectedChange($event)\"/> <span class=\"checkbox__input\"></span> </label> </td> <td *ngFor=\"let column of options.columns\"> <ng-container *ngIf=\"column.template else columnRender\"> <ng-container *ngTemplateOutlet=\"column.template; context: {celltemplate:column,celldata:item}\"></ng-container> </ng-container> <ng-template #columnRender> <span [innerHtml]=\"column.render(item)\"></span> </ng-template> </td> <td *ngIf=\"options.rowWellTemplate\"> <a class=\"link\" (click)=\"item.toggleWell = !item.toggleWell\"> <span class=\"icon-small\" [ngClass]=\"{ 'icon-chevron-up': item.toggleWell, 'icon-chevron-down': !item.toggleWell }\"></span> </a> </td> </tr> <tr *ngIf=\"options.rowWellTemplate && item.toggleWell\" class=\"no-highlight fade well ng-scope\"> <td [attr.colspan]=\"options.selectable ? (options.columns.length + 2) : (options.columns.length + 1)\"> <div class=\"panel panel--ltgray panel--well\"> <ng-container *ngTemplateOutlet=\"options.rowWellTemplate; context: {item: item}\"></ng-container> </div> </td> </tr> </ng-container> </tbody> </table> </div> ",
                    providers: [StaticPagerService],
                },] },
    ];
    /** @nocollapse */
    CuiTableComponent.ctorParameters = function () { return [
        { type: StaticPagerService, },
    ]; };
    CuiTableComponent.propDecorators = {
        "options": [{ type: Input },],
        "data": [{ type: Input },],
        "limit": [{ type: Input },],
        "offset": [{ type: Input },],
        "allSelected": [{ type: Input },],
        "onSortingChanged": [{ type: Output },],
        "onSelectionChanged": [{ type: Output },],
        "onTableRowClicked": [{ type: Output },],
    };
    return CuiTableComponent;
}());
export { CuiTableComponent };
//# sourceMappingURL=cui-table.component.js.map