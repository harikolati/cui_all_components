import { ChangeDetectorRef, Component, EventEmitter, Input, KeyValueDiffers, IterableDiffers, Output, } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CuiFilterOptions } from './cui-filter-options';
import { defaults, each, find, forOwn } from 'lodash-es';
var _ = { defaults: defaults, each: each, find: find, forOwn: forOwn };
/**
 * Component for data filters using CiscoUI
 */
var CuiFilterComponent = (function () {
    function CuiFilterComponent(activatedRoute, cdr, differs, iDiffers, location) {
        this.activatedRoute = activatedRoute;
        this.cdr = cdr;
        this.differs = differs;
        this.iDiffers = iDiffers;
        this.location = location;
        /**
             * The draw options for the filters
             */
        this.options = new CuiFilterOptions();
        /**
             * Event emitted when the filters are updated
             */
        this.onFiltersChanged = new EventEmitter();
        /**
             * The currently selected filters
             */
        this.selectedFilters = {};
        /**
             * Starts paging the dropdown if there are more than N options
             */
        this.PAGINATE_MIN = 100;
        this.itemsDifferStore = {};
        this.groupsDifferStore = {};
    }
    CuiFilterComponent.prototype.ngDoCheck = function () {
        var _this = this;
        var filtersChange = this.filtersDiffer.diff(this.options.filters);
        if (filtersChange) {
            this.updateSelectedFilters();
            this.setDiffers();
            return;
        }
        var deepFiltersChanges = false;
        _.each(this.options.filters, function (filter) {
            var itemsDiff = _this.itemsDifferStore[filter.value].diff(filter.items);
            if (itemsDiff) {
                deepFiltersChanges = true;
            }
            var groupsDiff = _this.groupsDifferStore[filter.value].diff(filter.items);
            if (groupsDiff) {
                deepFiltersChanges = true;
            }
        });
        if (deepFiltersChanges) {
            this.selectFiltersFromQuery(this.queryParams || this.routeParams);
            this.updateSelectedFilters();
            this.mergeDiffers();
        }
    };
    CuiFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.querySubscribe = this.activatedRoute.queryParams.subscribe(function (params) {
            _this.routeParams = params;
            _this.selectFiltersFromQuery(params);
            _this.updateSelectedFilters();
        });
        this.iDiffers.find([]).create();
        this.filtersDiffer = this.iDiffers.find(this.options.filters).create();
        this.setDiffers();
    };
    CuiFilterComponent.prototype.ngOnDestroy = function () {
        this.querySubscribe.unsubscribe();
    };
    CuiFilterComponent.prototype.setDiffers = function () {
        var _this = this;
        this.itemsDifferStore = {};
        this.groupsDifferStore = {};
        each(this.options.filters, function (filter) {
            _this.groupsDifferStore[filter.value] = _this.differs.find(filter || {}).create();
            _this.itemsDifferStore[filter.value] = _this.differs.find(filter.items || []).create();
        });
    };
    CuiFilterComponent.prototype.mergeDiffers = function () {
        var _this = this;
        each(this.options.filters, function (filter) {
            defaults(_this.groupsDifferStore, (_a = {}, _a[filter.value] = _this.differs.find(filter || {}).create(), _a));
            defaults(_this.itemsDifferStore, (_b = {}, _b[filter.value] = _this.differs.find(filter.items || []).create(), _b));
            var _a, _b;
        });
    };
    CuiFilterComponent.prototype.selectFiltersFromQuery = function (params) {
        var _this = this;
        this.queryParams = {};
        _.forOwn(params, function (_val, key) {
            if (params.hasOwnProperty(key)) {
                _this.queryParams[key] = params[key];
                var group = _.find(_this.options.filters, function (item) { return item.value === key; });
                if (group) {
                    var values = typeof params[key] === 'string' ? [params[key]] : params[key];
                    var _loop_1 = function (value) {
                        var item = _.find(group.items, function (itm) { return itm.value === value; });
                        if (item) {
                            item.setSelected(true, group);
                        }
                        if (group.isDropdown) {
                            group.selections = (group.selections || []).concat([item]);
                        }
                    };
                    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                        var value = values_1[_i];
                        _loop_1(value);
                    }
                }
            }
        });
    };
    CuiFilterComponent.prototype.updateSelectedFilters = function () {
        var selectedFilters = {};
        _.each(this.options.filters, function (group) {
            _.each(group.items, function (item) {
                if (item.selected) {
                    if (!selectedFilters[group.value]) {
                        selectedFilters[group.value] = [item.value];
                    }
                    else {
                        selectedFilters[group.value].push(item.value);
                    }
                }
            });
        });
        this.selectedFilters = selectedFilters;
        if (this.options.updateParams) {
            this.updateQueryParams();
        }
    };
    CuiFilterComponent.prototype.emitSelectedFilters = function () {
        this.onFiltersChanged.emit(this.selectedFilters);
    };
    CuiFilterComponent.prototype.updateQueryParams = function () {
        var filterLabels = this.options.filters.map(function (group) { return group.value; });
        var newQueryParams = {};
        for (var key in this.queryParams) {
            if (this.queryParams.hasOwnProperty(key)) {
                var match = false;
                for (var _i = 0, filterLabels_1 = filterLabels; _i < filterLabels_1.length; _i++) {
                    var filterLabel = filterLabels_1[_i];
                    if (key === filterLabel) {
                        match = true;
                        break;
                    }
                }
                if (!match) {
                    newQueryParams[key] = this.queryParams[key];
                }
            }
        }
        for (var key in this.selectedFilters) {
            if (this.selectedFilters.hasOwnProperty(key)) {
                newQueryParams[key] = this.selectedFilters[key];
            }
        }
        this.queryParams = newQueryParams;
        this.updateQueryString();
    };
    CuiFilterComponent.prototype.updateQueryString = function () {
        var queryString = "";
        for (var key in this.queryParams) {
            if (typeof this.queryParams[key] === 'string') {
                queryString += "" + (queryString.length ? '&' : '?') + key + "=" + this.queryParams[key];
            }
            else if (Array.isArray(this.queryParams[key])) {
                for (var _i = 0, _a = this.queryParams[key]; _i < _a.length; _i++) {
                    var param = _a[_i];
                    queryString += "" + (queryString.length ? '&' : '?') + key + "=" + param;
                }
            }
        }
        var queryIndex = this.location.path().indexOf('?');
        if (queryIndex > -1) {
            this.location.replaceState(this.location.path().substr(0, queryIndex) + queryString);
        }
        else {
            this.location.replaceState(this.location.path() + queryString);
        }
    };
    /**
     * Toggles the selection state of a filter
     * @param filter The filter to toggle
     * @param group
     */
    /**
         * Toggles the selection state of a filter
         * @param filter The filter to toggle
         * @param group
         */
    CuiFilterComponent.prototype.toggleFilter = /**
         * Toggles the selection state of a filter
         * @param filter The filter to toggle
         * @param group
         */
    function (filter, group) {
        filter.toggleSelected(group);
        this.updateSelectedFilters();
        this.emitSelectedFilters();
        this.cdr.detectChanges();
    };
    /**
     * Clears selection of a single filter group
     * @param group The group to clear
     */
    /**
         * Clears selection of a single filter group
         * @param group The group to clear
         */
    CuiFilterComponent.prototype.clearFilters = /**
         * Clears selection of a single filter group
         * @param group The group to clear
         */
    function (group) {
        group.clearFilters();
        this.updateSelectedFilters();
        this.emitSelectedFilters();
    };
    /**
     * Clears selection of all filter groups
     */
    /**
         * Clears selection of all filter groups
         */
    CuiFilterComponent.prototype.clearAllFilters = /**
         * Clears selection of all filter groups
         */
    function () {
        for (var _i = 0, _a = this.options.filters; _i < _a.length; _i++) {
            var group = _a[_i];
            group.clearFilters();
        }
        this.updateSelectedFilters();
        this.emitSelectedFilters();
    };
    CuiFilterComponent.prototype.onDropdownChanged = function (group) {
        // set selected field on all filters
        _.each(group.items, function (item) {
            item.setSelected(false, group);
            _.each(group.selections, function (s) {
                if (item.value === s.value) {
                    item.setSelected(true, group);
                }
            });
        });
        this.updateSelectedFilters();
        this.emitSelectedFilters();
        this.cdr.detectChanges();
    };
    CuiFilterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-filter',
                    template: "<div class=\"filter-groups\"> <div class=\"filter-group half-margin-bottom\" *ngFor=\"let group of options.filters\" [ngClass]=\"{ 'base-margin-bottom' : group.isDropdown }\"> <div class=\"legend legend--toggle text-capitalize\" *ngIf=\"group.label\" (click)=\"group.toggleOpen()\"> <span class=\"qtr-margin-left\">{{group.label}}</span> <small class=\"pull-right\"> <span *ngIf=\"!group.open\" [ngClass]=\"{'icon-chevron-down': !options.rightToDown, 'icon-chevron-right': options.rightToDown}\"></span> <span *ngIf=\"group.open\" class=\"icon-chevron-up\"></span> </small> </div> <div *ngIf=\"group.open && !group.isDropdown\"> <div *ngFor=\"let item of group.items\"> <label class=\"checkbox\"> <input type=\"checkbox\" (click)=\"toggleFilter(item, group)\" [checked]=\"item.selected\"> <span class=\"checkbox__input\"></span> <span class=\"checkbox__label\" [ngClass]=\"{'text-blue': item.selected}\" [title]=\"item.label\">{{item.label}}</span> </label> </div> <p *ngIf=\"group.hasItemSelected\"> <a (click)=\"clearFilters(group)\">{{options.clearFiltersLabel}}</a> </p> </div> <div *ngIf=\"group.open && group.isDropdown\"> <div *ngIf=\"group.items; else loader\"> <cui-select [label]=\"group.placeholder\" [items]=\"group.items\" [(ngModel)]=\"group.selections\"  (ngModelChange)=\"onDropdownChanged(group)\" optionsKey=\"label\" multiSelect=\"true\" [paginate]=\"group.selections?.length > PAGINATE_MIN\"></cui-select> <cui-labels [(ngModel)]=\"group.selections\" (ngModelChange)=\"onDropdownChanged(group)\" labelKey=\"label\"></cui-labels> </div> <ng-template #loader> <cui-loader></cui-loader> </ng-template> <p *ngIf=\"group.hasItemSelected\"> <a (click)=\"clearFilters(group)\">{{options.clearFiltersLabel}}</a> </p> </div> </div> </div> ",
                },] },
    ];
    /** @nocollapse */
    CuiFilterComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
        { type: ChangeDetectorRef, },
        { type: KeyValueDiffers, },
        { type: IterableDiffers, },
        { type: Location, },
    ]; };
    CuiFilterComponent.propDecorators = {
        "options": [{ type: Input },],
        "onFiltersChanged": [{ type: Output },],
    };
    return CuiFilterComponent;
}());
export { CuiFilterComponent };
//# sourceMappingURL=cui-filter.component.js.map