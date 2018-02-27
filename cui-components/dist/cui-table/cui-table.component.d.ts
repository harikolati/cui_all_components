import { EventEmitter, OnInit } from '@angular/core';
import { CuiTableOptions } from './cui-table-options';
import { CuiTableColumnOption } from './cui-table-column-option';
import { StaticPagerService } from '@cisco-ngx/cui-services';
export declare class CuiTableComponent implements OnInit {
    staticPagerService: StaticPagerService;
    /**
     * The table options object
     */
    options: CuiTableOptions;
    /**
     * The data to populate the table with
     */
    data: any[];
    /**
     * (optional) Number of items per page
     */
    limit: number;
    /**
     * (optional) The current page index
     */
    offset: number;
    /**
     * Whether all items in the table are selected
     */
    allSelected: boolean;
    /**
     * Event emitted when the sorting has changed
     */
    onSortingChanged: EventEmitter<CuiTableColumnOption>;
    /**
     * Event emitted when the items selected has changed
     */
    onSelectionChanged: EventEmitter<any[]>;
    /**
     * Event emitted when the table click view  happens
     */
    onTableRowClicked: EventEmitter<any[]>;
    constructor(staticPagerService: StaticPagerService);
    ngOnInit(): void;
    /**
     * Toggles selection of all items
     */
    toggleAllSelected(): void;
    /**
     * Sorts the table by a column
     * @param  {CuiTableColumnOption} sortColumn The column to sort by
     */
    sortTable(sortColumn: CuiTableColumnOption): void;
    onItemSelectedChange(): void;
    getSelectedItems(): any[];
    getDisplayedData(): any[];
}
