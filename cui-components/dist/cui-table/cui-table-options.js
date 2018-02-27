import { CuiTableColumnOption } from './cui-table-column-option';
/**
 * Options object for the CuiTableComponent
 */
var /**
 * Options object for the CuiTableComponent
 */
CuiTableOptions = (function () {
    function CuiTableOptions(options) {
        /**
             * Whether the table is bordered
             */
        this.bordered = false;
        /**
             * Whether the table has a striped background
             */
        this.striped = true;
        /**
             * Whether the table highlights on hover
             */
        this.hover = false;
        /**
             * Whether the table cells wrap text
             */
        this.wrapText = false;
        /**
             * Table padding/size (compressed, regular, loose)
             */
        this.padding = 'regular';
        /**
             * Whether items in the table are selectable by a checkbox
             */
        this.selectable = false;
        /**
             * Whether items in the table loaded from a service
             */
        this.dynamicData = true;
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                if (key === 'columns') {
                    this.createColumns(options.columns || []);
                    continue;
                }
                this[key] = options[key];
            }
        }
    }
    CuiTableOptions.prototype.createColumns = function (columns) {
        var columnOptions = [];
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            columnOptions.push(new CuiTableColumnOption(column));
        }
        this.columns = columnOptions;
    };
    return CuiTableOptions;
}());
/**
 * Options object for the CuiTableComponent
 */
export { CuiTableOptions };
//# sourceMappingURL=cui-table-options.js.map