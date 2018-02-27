import { TemplateRef } from '@angular/core';
import { CuiTableColumnOption } from './cui-table-column-option';
/**
 * Options object for the CuiTableComponent
 */
export declare class CuiTableOptions {
    /**
     * Index signature
     */
    [key: string]: any;
    /**
     * Array of individual column option objects
     */
    columns: CuiTableColumnOption[];
    /**
     * Whether the table is bordered
     */
    bordered: boolean;
    /**
     * Whether the table has a striped background
     */
    striped: boolean;
    /**
     * Whether the table highlights on hover
     */
    hover: boolean;
    /**
     * Whether the table cells wrap text
     */
    wrapText: boolean;
    /**
     * Table padding/size (compressed, regular, loose)
     */
    padding: string;
    /**
     * Whether items in the table are selectable by a checkbox
     */
    selectable: boolean;
    /**
     * Whether items in the table loaded from a service
     */
    dynamicData: boolean;
    /**
     * The template for a row well
     */
    rowWellTemplate: TemplateRef<any>;
    constructor(options: any);
    private createColumns(columns);
}
