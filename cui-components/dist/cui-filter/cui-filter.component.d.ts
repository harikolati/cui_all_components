import { ChangeDetectorRef, DoCheck, EventEmitter, KeyValueDiffers, IterableDiffers, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { CuiFilterOptions, CuiFilterGroup, CuiFilter } from './cui-filter-options';
/**
 * Component for data filters using CiscoUI
 */
export declare class CuiFilterComponent implements DoCheck, OnInit, OnDestroy {
    private activatedRoute;
    private cdr;
    private differs;
    private iDiffers;
    private location;
    /**
     * The draw options for the filters
     */
    options: CuiFilterOptions;
    /**
     * Event emitted when the filters are updated
     */
    onFiltersChanged: EventEmitter<any>;
    /**
     * The currently selected filters
     */
    selectedFilters: any;
    /**
     * Starts paging the dropdown if there are more than N options
     */
    PAGINATE_MIN: number;
    private querySubscribe;
    private queryParams;
    private itemsDifferStore;
    private groupsDifferStore;
    private filtersDiffer;
    private routeParams;
    constructor(activatedRoute: ActivatedRoute, cdr: ChangeDetectorRef, differs: KeyValueDiffers, iDiffers: IterableDiffers, location: Location);
    ngDoCheck(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    setDiffers(): void;
    mergeDiffers(): void;
    selectFiltersFromQuery(params: Params): void;
    updateSelectedFilters(): void;
    emitSelectedFilters(): void;
    updateQueryParams(): void;
    updateQueryString(): void;
    /**
     * Toggles the selection state of a filter
     * @param filter The filter to toggle
     * @param group
     */
    toggleFilter(filter: CuiFilter, group: CuiFilterGroup): void;
    /**
     * Clears selection of a single filter group
     * @param group The group to clear
     */
    clearFilters(group: CuiFilterGroup): void;
    /**
     * Clears selection of all filter groups
     */
    clearAllFilters(): void;
    onDropdownChanged(group: CuiFilterGroup): void;
}
