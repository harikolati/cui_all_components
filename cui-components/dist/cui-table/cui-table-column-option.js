/**
 * Options for a column of an CuiTableComponent
 */
var /**
 * Options for a column of an CuiTableComponent
 */
CuiTableColumnOption = (function () {
    function CuiTableColumnOption(options) {
        /**
             * The name to display in the column header
             */
        this.name = '';
        /**
             * Whether the column is sortable
             */
        this.sortable = true;
        /**
             * Whether this is the default sorting column
             */
        this.sorting = false;
        /**
             * Width of the column
             */
        this.width = 'auto';
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        if (!this.sortDirection) {
            this.sortDirection = this.sorting ? 'asc' : 'desc';
        }
    }
    /**
     * Returns the cell key or render function result
     * @param item The row item
     * @returns The render result
     */
    /**
         * Returns the cell key or render function result
         * @param item The row item
         * @returns The render result
         */
    CuiTableColumnOption.prototype.render = /**
         * Returns the cell key or render function result
         * @param item The row item
         * @returns The render result
         */
    function (item) {
        if (item[this.key]) {
            return item[this.key].toString();
        }
    };
    return CuiTableColumnOption;
}());
/**
 * Options for a column of an CuiTableComponent
 */
export { CuiTableColumnOption };
//# sourceMappingURL=cui-table-column-option.js.map