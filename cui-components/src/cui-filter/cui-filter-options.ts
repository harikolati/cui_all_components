import { each, some } from 'lodash-es';

/**
 * Display options for a CuiFilterComponent
 */
export class CuiFilterOptions {
	/**
	 * Index signature
	 */
	[key: string]: any;
	/**
	 * Whether to display closed dropdown carets pointing to the right
	 */
	public rightToDown = false;
	/**
	 * Text to display for the clear filters link
	 */
	public clearFiltersLabel = 'Clear Filters';
	/**
	 * The filter groups to display
	 */
	public filters: CuiFilterGroup[] = [];
	/**
	 * Whether to automatically update url params when filters change
	 */
	public updateParams = false;

	/**
	 * @param options Object containing filter options to parse
	 */
	constructor(options: any = {}) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				if (key === 'filters') {
					this.buildFilters(options[key]);
					continue;
				}

				this[key] = options[key];
			}
		}
	}

	buildFilters (filters: any[]) {
		const builtFilters: CuiFilterGroup[] = [];
		each(filters, filter => {
			builtFilters.push(new CuiFilterGroup(filter));
		});

		this.filters = builtFilters;
	}
}

/**
 * A group of filters for CuiFilterComponent
 */
export class CuiFilterGroup {
	/**
	 * Index signature
	 */
	[key: string]: any;
	/**
	 * The text to display for the filter group
	 */
	public label: string;
	/**
	 * The key of the filter that the group represents
	 */
	public value: string;
	/**
	 * Whether the filter group is toggled open
	 */
	public open = true;
	/**
	 * The filter items in the group
	 */
	public items: CuiFilter[] = null;
	/**
	 * Whether FilterGroup is checkbox or multiselect dropdown
	 */
	public isDropdown = false;
	/**
	 * Placeholder value for dropdown
	 */
	public placeholder = 'Select a Value';

	/**
	 * @param options Object containing filter group options to parse
	 */
	constructor(options: any) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				if (key === 'items') {
					this.buildItems(options[key]);
					continue;
				}

				this[key] = options[key];
			}
		}
	}

	buildItems (items: any[]) {
		let builtItems: CuiFilter[];
		each(items, item => {
			builtItems = [...(builtItems || []), new CuiFilter(item)];
		});

		this.items = builtItems;
	}

	/**
	 * Toggles the open state of the group
	 */
	public toggleOpen () {
		this.open = !this.open;
	}

	/**
	 * Sets the open state of the group
	 * @param open Whether to open the group
	 */
	public setOpen (open: boolean) {
		this.open = open;
	}

	/**
	 * Clears the filters in the group
	 */
	public clearFilters () {
		for (const item of this.items) {
			item.setSelected(false, this);
		}
		if (this.isDropdown) {
			this.selections = [];
		}
	}
}

/**
 * An individual filter object for a CuiFilterComponent
 */
export class CuiFilter {
	/**
	 * Index signature
	 */
	[key: string]: any;
	/**
	 * The text to display for the filter
	 */
	public label: string;
	/**
	 * The value of the filter
	 */
	public value: string;
	/**
	 * Whether the filter is selected
	 */
	public selected = false;

	/**
	 * @param options Object containing filter options to parse
	 */
	constructor(options: any) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				this[key] = options[key];
			}
		}
	}

	/**
	 * Toggles the selected state of a filter
	 * @param group
	 */
	public toggleSelected (group: CuiFilterGroup) {
		this.selected = !this.selected;
		group.hasItemSelected = some(group.items, i => i.selected);
	}

	/**
	 * Sets the selected state of a filter
	 * @param selected Whether the filter is selected
	 * @param group
	 */
	public setSelected (selected: boolean, group: CuiFilterGroup) {
		this.selected = selected;
		group.hasItemSelected = some(group.items, i => i.selected);
	}
}
