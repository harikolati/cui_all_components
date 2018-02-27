import { each, some } from 'lodash-es';
/**
 * Display options for a CuiFilterComponent
 */
var /**
 * Display options for a CuiFilterComponent
 */
CuiFilterOptions = (function () {
    /**
     * @param options Object containing filter options to parse
     */
    function CuiFilterOptions(options) {
        if (options === void 0) { options = {}; }
        /**
             * Whether to display closed dropdown carets pointing to the right
             */
        this.rightToDown = false;
        /**
             * Text to display for the clear filters link
             */
        this.clearFiltersLabel = 'Clear Filters';
        /**
             * The filter groups to display
             */
        this.filters = [];
        /**
             * Whether to automatically update url params when filters change
             */
        this.updateParams = false;
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                if (key === 'filters') {
                    this.buildFilters(options[key]);
                    continue;
                }
                this[key] = options[key];
            }
        }
    }
    CuiFilterOptions.prototype.buildFilters = function (filters) {
        var builtFilters = [];
        each(filters, function (filter) {
            builtFilters.push(new CuiFilterGroup(filter));
        });
        this.filters = builtFilters;
    };
    return CuiFilterOptions;
}());
/**
 * Display options for a CuiFilterComponent
 */
export { CuiFilterOptions };
/**
 * A group of filters for CuiFilterComponent
 */
var /**
 * A group of filters for CuiFilterComponent
 */
CuiFilterGroup = (function () {
    /**
     * @param options Object containing filter group options to parse
     */
    function CuiFilterGroup(options) {
        /**
             * Whether the filter group is toggled open
             */
        this.open = true;
        /**
             * The filter items in the group
             */
        this.items = null;
        /**
             * Whether FilterGroup is checkbox or multiselect dropdown
             */
        this.isDropdown = false;
        /**
             * Placeholder value for dropdown
             */
        this.placeholder = 'Select a Value';
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                if (key === 'items') {
                    this.buildItems(options[key]);
                    continue;
                }
                this[key] = options[key];
            }
        }
    }
    CuiFilterGroup.prototype.buildItems = function (items) {
        var builtItems;
        each(items, function (item) {
            builtItems = (builtItems || []).concat([new CuiFilter(item)]);
        });
        this.items = builtItems;
    };
    /**
     * Toggles the open state of the group
     */
    /**
         * Toggles the open state of the group
         */
    CuiFilterGroup.prototype.toggleOpen = /**
         * Toggles the open state of the group
         */
    function () {
        this.open = !this.open;
    };
    /**
     * Sets the open state of the group
     * @param open Whether to open the group
     */
    /**
         * Sets the open state of the group
         * @param open Whether to open the group
         */
    CuiFilterGroup.prototype.setOpen = /**
         * Sets the open state of the group
         * @param open Whether to open the group
         */
    function (open) {
        this.open = open;
    };
    /**
     * Clears the filters in the group
     */
    /**
         * Clears the filters in the group
         */
    CuiFilterGroup.prototype.clearFilters = /**
         * Clears the filters in the group
         */
    function () {
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.setSelected(false, this);
        }
        if (this.isDropdown) {
            this.selections = [];
        }
    };
    return CuiFilterGroup;
}());
/**
 * A group of filters for CuiFilterComponent
 */
export { CuiFilterGroup };
/**
 * An individual filter object for a CuiFilterComponent
 */
var /**
 * An individual filter object for a CuiFilterComponent
 */
CuiFilter = (function () {
    /**
     * @param options Object containing filter options to parse
     */
    function CuiFilter(options) {
        /**
             * Whether the filter is selected
             */
        this.selected = false;
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
    }
    /**
     * Toggles the selected state of a filter
     * @param group
     */
    /**
         * Toggles the selected state of a filter
         * @param group
         */
    CuiFilter.prototype.toggleSelected = /**
         * Toggles the selected state of a filter
         * @param group
         */
    function (group) {
        this.selected = !this.selected;
        group.hasItemSelected = some(group.items, function (i) { return i.selected; });
    };
    /**
     * Sets the selected state of a filter
     * @param selected Whether the filter is selected
     * @param group
     */
    /**
         * Sets the selected state of a filter
         * @param selected Whether the filter is selected
         * @param group
         */
    CuiFilter.prototype.setSelected = /**
         * Sets the selected state of a filter
         * @param selected Whether the filter is selected
         * @param group
         */
    function (selected, group) {
        this.selected = selected;
        group.hasItemSelected = some(group.items, function (i) { return i.selected; });
    };
    return CuiFilter;
}());
/**
 * An individual filter object for a CuiFilterComponent
 */
export { CuiFilter };
//# sourceMappingURL=cui-filter-options.js.map