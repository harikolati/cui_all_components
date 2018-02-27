import { SortableField } from '@cisco-ngx/cui-services';
/**
 * Options for a column of an CuiTableComponent
 */
export declare class CuiTableColumnOption implements SortableField {
    /**
     * Index signature
     */
    [key: string]: any;
    /**
     * The name to display in the column header
     */
    name: string;
    /**
     * (optional) The key of the object in the data array to display in each row
     */
    key: string;
    /**
     * Whether the column is sortable
     */
    sortable: boolean;
    /**
     * Whether this is the default sorting column
     */
    sorting: boolean;
    /**
     * Whether to sort ascending or descending by default (asc,desc)
     */
    sortDirection: string;
    /**
     * The key to sort by, if a render function is used instead of a key
     */
    sortKey: string;
    /**
     * Width of the column
     */
    width: string;
    constructor(options: any);
    /**
     * Returns the cell key or render function result
     * @param item The row item
     * @returns The render result
     */
    render(item: any): any;
}
