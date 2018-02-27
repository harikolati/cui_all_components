/**
 * Display options for a CuiFilterComponent
 */
export declare class CuiFilterOptions {
    /**
     * Index signature
     */
    [key: string]: any;
    /**
     * Whether to display closed dropdown carets pointing to the right
     */
    rightToDown: boolean;
    /**
     * Text to display for the clear filters link
     */
    clearFiltersLabel: string;
    /**
     * The filter groups to display
     */
    filters: CuiFilterGroup[];
    /**
     * Whether to automatically update url params when filters change
     */
    updateParams: boolean;
    /**
     * @param options Object containing filter options to parse
     */
    constructor(options?: any);
    buildFilters(filters: any[]): void;
}
/**
 * A group of filters for CuiFilterComponent
 */
export declare class CuiFilterGroup {
    /**
     * Index signature
     */
    [key: string]: any;
    /**
     * The text to display for the filter group
     */
    label: string;
    /**
     * The key of the filter that the group represents
     */
    value: string;
    /**
     * Whether the filter group is toggled open
     */
    open: boolean;
    /**
     * The filter items in the group
     */
    items: CuiFilter[];
    /**
     * Whether FilterGroup is checkbox or multiselect dropdown
     */
    isDropdown: boolean;
    /**
     * Placeholder value for dropdown
     */
    placeholder: string;
    /**
     * @param options Object containing filter group options to parse
     */
    constructor(options: any);
    buildItems(items: any[]): void;
    /**
     * Toggles the open state of the group
     */
    toggleOpen(): void;
    /**
     * Sets the open state of the group
     * @param open Whether to open the group
     */
    setOpen(open: boolean): void;
    /**
     * Clears the filters in the group
     */
    clearFilters(): void;
}
/**
 * An individual filter object for a CuiFilterComponent
 */
export declare class CuiFilter {
    /**
     * Index signature
     */
    [key: string]: any;
    /**
     * The text to display for the filter
     */
    label: string;
    /**
     * The value of the filter
     */
    value: string;
    /**
     * Whether the filter is selected
     */
    selected: boolean;
    /**
     * @param options Object containing filter options to parse
     */
    constructor(options: any);
    /**
     * Toggles the selected state of a filter
     * @param group
     */
    toggleSelected(group: CuiFilterGroup): void;
    /**
     * Sets the selected state of a filter
     * @param selected Whether the filter is selected
     * @param group
     */
    setSelected(selected: boolean, group: CuiFilterGroup): void;
}
