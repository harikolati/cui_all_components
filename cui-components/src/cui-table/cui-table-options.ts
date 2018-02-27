import { TemplateRef } from '@angular/core';
import { CuiTableColumnOption } from './cui-table-column-option';

/**
 * Options object for the CuiTableComponent
 */
export class CuiTableOptions {
	/**
	 * Index signature
	 */
	[key: string]: any;
	/**
	 * Array of individual column option objects
	 */
	public columns: CuiTableColumnOption[];
	/**
	 * Whether the table is bordered
	 */
	public bordered = false;
	/**
	 * Whether the table has a striped background
	 */
	public striped = true;
	/**
	 * Whether the table highlights on hover
	 */
	public hover = false;
	/**
	 * Whether the table cells wrap text
	 */
	public wrapText = false;
	/**
	 * Table padding/size (compressed, regular, loose)
	 */
	public padding = 'regular';
	/**
	 * Whether items in the table are selectable by a checkbox
	 */
	public selectable = false;
	/**
	 * Whether items in the table loaded from a service
	 */
	public dynamicData = true;
	/**
	 * The template for a row well
	 */
	public rowWellTemplate: TemplateRef<any>;

	constructor(options: any) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				if (key === 'columns') {
					this.createColumns(options.columns || []);
					continue;
				}

				this[key] = options[key];
			}
		}
	}

	private createColumns (columns: any[]) {
		const columnOptions: CuiTableColumnOption[] = [];
		for (const column of columns) {
			columnOptions.push(new CuiTableColumnOption(column));
		}

		this.columns = columnOptions;
	}
}
