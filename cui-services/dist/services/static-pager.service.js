/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
var StaticPagerService = (function () {
    function StaticPagerService() {
    }
    /**
     * Returns a single page's objects
     * @param {?} data   The data to page
     * @param {?} offset The page index
     * @param {?} limit  The number of items per page
     * @return {?} The paged data
     */
    StaticPagerService.prototype.getPagedData = /**
     * Returns a single page's objects
     * @param {?} data   The data to page
     * @param {?} offset The page index
     * @param {?} limit  The number of items per page
     * @return {?} The paged data
     */
    function (data, offset, limit) {
        if (!limit) {
            return data;
        }
        var /** @type {?} */ displayedData = data.slice();
        return displayedData.splice(offset * limit, limit);
    };
    /**
     * Sorts a data set by a field
     * @param {?} sortField    The field to sort by
     * @param {?} allFields    All sortable fields
     * @param {?} data         The data to sort
     * @return {?} The sorted data
     */
    StaticPagerService.prototype.sort = /**
     * Sorts a data set by a field
     * @param {?} sortField    The field to sort by
     * @param {?} allFields    All sortable fields
     * @param {?} data         The data to sort
     * @return {?} The sorted data
     */
    function (sortField, allFields, data) {
        if (!sortField.sortable) {
            return data;
        }
        var /** @type {?} */ sortDirection = sortField.sortDirection === 'asc' ? 'desc' : 'asc';
        for (var _i = 0, allFields_1 = allFields; _i < allFields_1.length; _i++) {
            var column = allFields_1[_i];
            column.sorting = false;
            column.sortDirection = 'desc';
        }
        sortField.sorting = true;
        sortField.sortDirection = sortDirection;
        var /** @type {?} */ sortedData = data.slice();
        return this.sortDataByField(sortField, sortedData);
    };
    /**
     * @param {?} sortField
     * @param {?} data
     * @return {?}
     */
    StaticPagerService.prototype.sortDataByField = /**
     * @param {?} sortField
     * @param {?} data
     * @return {?}
     */
    function (sortField, data) {
        return data.sort(function (a, b) {
            if (sortField.sortDirection === 'asc') {
                if (sortField.sortKey) {
                    var /** @type {?} */ valA = typeof a[sortField.sortKey] !== 'boolean' ?
                        a[sortField.sortKey] : a[sortField.sortKey] ? 0 : 1;
                    var /** @type {?} */ valB = typeof b[sortField.sortKey] !== 'boolean' ?
                        b[sortField.sortKey] : b[sortField.sortKey] ? 0 : 1;
                    return valA > valB ? 1 : valA < valB ? -1 : 0;
                }
                return sortField.render(a) > sortField.render(b) ?
                    1 : sortField.render(a) < sortField.render(b) ? -1 : 0;
            }
            if (sortField.sortKey) {
                var /** @type {?} */ valA = typeof a[sortField.sortKey] !== 'boolean' ?
                    a[sortField.sortKey] : a[sortField.sortKey] ? 0 : 1;
                var /** @type {?} */ valB = typeof b[sortField.sortKey] !== 'boolean' ?
                    b[sortField.sortKey] : b[sortField.sortKey] ? 0 : 1;
                return valA < valB ? 1 : valA > valB ? -1 : 0;
            }
            return sortField.render(a) < sortField.render(b) ?
                1 : sortField.render(a) > sortField.render(b) ? -1 : 0;
        });
    };
    StaticPagerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    StaticPagerService.ctorParameters = function () { return []; };
    return StaticPagerService;
}());
export { StaticPagerService };
function StaticPagerService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    StaticPagerService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    StaticPagerService.ctorParameters;
}
//# sourceMappingURL=static-pager.service.js.map