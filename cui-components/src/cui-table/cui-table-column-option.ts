import { SortableField } from '@cisco-ngx/cui-services';

/**
 * Options for a column of an CuiTableComponent
 */
export class CuiTableColumnOption implements SortableField {
	/**
	 * Index signature
	 */
	[key: string]: any;
	/**
	 * The name to display in the column header
	 */
	public name = '';
	/**
	 * (optional) The key of the object in the data array to display in each row
	 */
	public key: string;
	/**
	 * Whether the column is sortable
	 */
	public sortable = true;
	/**
	 * Whether this is the default sorting column
	 */
	public sorting = false;
	/**
	 * Whether to sort ascending or descending by default (asc,desc)
	 */
	public sortDirection: string;
	/**
	 * The key to sort by, if a render function is used instead of a key
	 */
	public sortKey: string;
	/**
	 * Width of the column
	 */
	public width = 'auto';

	constructor(options: any) {
		for (const key in options) {
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
	public render (item: any) {
		if (item[this.key]) {
			return item[this.key].toString();
		}
	}
}
