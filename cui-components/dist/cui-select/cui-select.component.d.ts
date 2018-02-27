import { ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, IterableDiffers, OnChanges, OnDestroy, OnInit, QueryList, Renderer2, SimpleChanges } from '@angular/core';
import { CuiSelectPaginatorDirective } from './cui-select-paginator.directive';
import { Subscription } from 'rxjs/Subscription';
export declare class CuiSelectComponent implements DoCheck, OnInit, OnDestroy, OnChanges {
    private cdr;
    private differs;
    private renderer;
    /**
     * The items available for selection.
     */
    items: any[];
    /**
     * The currently selected item(s).
     * @Deprecated Use ngModel
     */
    selection: any;
    /**
     * The display name key for Object items.
     */
    optionsKey: string;
    /**
     * Optional value key for Object items.
     */
    optionsValue: string;
    /**
     * Whether the component is disabled.
     */
    disabled: boolean;
    /**
     * Whether to emit the entire selection or not
     */
    emitSelection: boolean;
    /**
     * Whether the input is required.
     */
    required: boolean;
    /**
     * Whether the items are grouped by category.
     */
    grouped: boolean;
    /**
     * Whether multi-item select is available.
     */
    multiSelect: boolean;
    /**
     * Whether a select all checkbox is available.
     */
    selectAllEnabled: boolean;
    /**
     * Optional title text for the component.
     */
    title: string;
    /**
     * Optional label for the input.
     */
    label: string;
    /**
     * Tab index of the input.
     */
    tabIndex: number;
    /**
     * Whether an empty selection button is available.
     */
    empty: boolean;
    /**
     * Whether to display the native mobile select element.
     */
    mobile: boolean;
    /**
     * Whether to paginate the select dropdown on scroll
     */
    paginate: boolean;
    /**
     * The placeholder text of the input element
     */
    placeholder: string;
    /**
     * Event emitted when an item is selected.
     * @Deprecated Use ngModelChange
     */
    selectChange: EventEmitter<any>;
    selectionChange: EventEmitter<any>;
    /**
     * Event emitted when a user types to filter
     */
    searchChange: EventEmitter<string>;
    input: ElementRef;
    paginatorList: QueryList<CuiSelectPaginatorDirective>;
    paginator: CuiSelectPaginatorDirective;
    paginatorSub: Subscription;
    /**
     * Whether the dropdown element is visible.
     */
    dropdownVisible: boolean;
    /**
     * Available items in the dropdown, set by the search input.
     */
    filteredItems: any[];
    guid: string;
    private mouseInInput;
    private mouseInDropdown;
    searchText: string;
    private globalClick;
    private selectingItem;
    private inputTitle;
    private differ;
    constructor(cdr: ChangeDetectorRef, differs: IterableDiffers, renderer: Renderer2);
    propagateChange: Function;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(): void;
    ngDoCheck(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    setupMultiSelected(): void;
    updateMultiSelected(): void;
    removeUnselected(item: any): void;
    outputSelection(): void;
    private toggleDropdown();
    private getItemDisplayName(item);
    private enterDropdown();
    private leaveDropdown();
    private enterInput();
    private leaveInput();
    private getMultiSelectDisplayString();
    private onKeydown(event);
    private onEnterKey(index);
    private onSearchChange();
    private clearSearchText(event);
    private filterItems();
    private selectItem(item);
    private onMobileSelectionChanged();
    private allSelected();
    private toggleSelectAll();
}
