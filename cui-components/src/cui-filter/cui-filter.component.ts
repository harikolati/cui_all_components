import {
	ChangeDetectorRef,
	Component,
	DoCheck,
	EventEmitter,
	Input,
	KeyValueDiffer,
	KeyValueDiffers,
	IterableDiffer,
	IterableDiffers,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { CuiFilterOptions, CuiFilterGroup, CuiFilter } from './cui-filter-options';
import { defaults, each, find, forOwn } from 'lodash-es';
const _ = { defaults, each, find, forOwn };

/**
 * Component for data filters using CiscoUI
 */
@Component({
	selector: 'cui-filter',
	templateUrl: './cui-filter.component.html',
})
export class CuiFilterComponent implements DoCheck, OnInit, OnDestroy {
	/**
	 * The draw options for the filters
	 */
	@Input() options: CuiFilterOptions = new CuiFilterOptions();

	/**
	 * Event emitted when the filters are updated
	 */
	@Output() onFiltersChanged: EventEmitter<any> = new EventEmitter();

	/**
	 * The currently selected filters
	 */
	public selectedFilters: any = {};
	/**
	 * Starts paging the dropdown if there are more than N options
	 */
	PAGINATE_MIN = 100;

	private querySubscribe: any;
	private queryParams: Params;
	private itemsDifferStore: { [key: string]: KeyValueDiffer<string, any> } = {};
	private groupsDifferStore: { [key: string]: KeyValueDiffer<string, any> } = {};
	private filtersDiffer: IterableDiffer<any>;
	private routeParams: Params;

	constructor(
		private activatedRoute: ActivatedRoute,
		private cdr: ChangeDetectorRef,
		private differs: KeyValueDiffers,
		private iDiffers: IterableDiffers,
		private location: Location,
	) {}

	ngDoCheck () {
		const filtersChange = this.filtersDiffer.diff(this.options.filters);
		if (filtersChange) {
			this.updateSelectedFilters();
			this.setDiffers();

			return;
		}
		let deepFiltersChanges = false;
		_.each(this.options.filters, (filter: CuiFilterGroup) => {
			const itemsDiff = this.itemsDifferStore[filter.value].diff(filter.items);
			if (itemsDiff) { deepFiltersChanges = true; }
			const groupsDiff = this.groupsDifferStore[filter.value].diff(filter.items);
			if (groupsDiff) { deepFiltersChanges = true; }
		});
		if (deepFiltersChanges) {
			this.selectFiltersFromQuery(this.queryParams || this.routeParams);
			this.updateSelectedFilters();
			this.mergeDiffers();
		}
	}

	ngOnInit () {
		this.querySubscribe = this.activatedRoute.queryParams.subscribe((params: Params) => {
			this.routeParams = params;
			this.selectFiltersFromQuery(params);
			this.updateSelectedFilters();
		});
		this.iDiffers.find([]).create();
		this.filtersDiffer = this.iDiffers.find(this.options.filters).create();
		this.setDiffers();
	}

	ngOnDestroy () {
		this.querySubscribe.unsubscribe();
	}

	setDiffers () {
		this.itemsDifferStore = {};
		this.groupsDifferStore = {};
		each(this.options.filters, (filter: CuiFilterGroup) => {
			this.groupsDifferStore[filter.value] = this.differs.find(filter || {}).create();
			this.itemsDifferStore[filter.value] = this.differs.find(filter.items || []).create();
		});
	}

	mergeDiffers () {
		each(this.options.filters, (filter: CuiFilterGroup) => {
			defaults(
				this.groupsDifferStore,
				{ [filter.value]: this.differs.find(filter || {}).create() },
			);
			defaults(
				this.itemsDifferStore,
				{ [filter.value]: this.differs.find(filter.items || []).create() },
			);
		});
	}

	selectFiltersFromQuery (params: Params) {
		this.queryParams = {};

		_.forOwn(params, (_val: any, key: string) => {
			if (params.hasOwnProperty(key)) {
				this.queryParams[key] = params[key];
				const group = _.find(this.options.filters, (item: any) => item.value === key);

				if (group) {
					const values = typeof params[key] === 'string' ? [params[key]] : params[key];

					for (const value of values) {
						const item = _.find(group.items, (itm: any) => itm.value === value);

						if (item) {
							item.setSelected(true, group);
						}

						if (group.isDropdown) {
							group.selections = [...(group.selections || []), item];
						}
					}
				}
			}
		});
	}

	updateSelectedFilters () {
		const selectedFilters: any = {};

		_.each(this.options.filters, group => {
			_.each(group.items, item => {
				if (item.selected) {
					if (!selectedFilters[group.value]) {
						selectedFilters[group.value] = [item.value];
					} else {
						selectedFilters[group.value].push(item.value);
					}
				}
			});
		});

		this.selectedFilters = selectedFilters;
		if (this.options.updateParams) {
			this.updateQueryParams();
		}
	}

	emitSelectedFilters () {
		this.onFiltersChanged.emit(this.selectedFilters);
	}

	updateQueryParams () {
		const filterLabels = this.options.filters.map(group => group.value);
		const newQueryParams: any = {};

		for (const key in this.queryParams) {
			if (this.queryParams.hasOwnProperty(key)) {
				let match = false;
				for (const filterLabel of filterLabels) {
					if (key === filterLabel) {
						match = true;
						break;
					}
				}

				if (!match) {
					newQueryParams[key] = this.queryParams[key];
				}
			}
		}

		for (const key in this.selectedFilters) {
			if (this.selectedFilters.hasOwnProperty(key)) {
				newQueryParams[key] = this.selectedFilters[key];
			}
		}

		this.queryParams = newQueryParams;
		this.updateQueryString();
	}

	updateQueryString () {
		let queryString = ``;

		for (const key in this.queryParams) {
			if (typeof this.queryParams[key] === 'string') {
				queryString += `${(queryString.length ? '&' : '?')}${key}=${this.queryParams[key]}`;
			} else if (Array.isArray(this.queryParams[key])) {
				for (const param of this.queryParams[key]) {
					queryString += `${(queryString.length ? '&' : '?')}${key}=${param}`;
				}
			}
		}

		const queryIndex = this.location.path().indexOf('?');
		if (queryIndex > -1) {
			this.location.replaceState(this.location.path().substr(0, queryIndex) + queryString);
		} else {
			this.location.replaceState(this.location.path() + queryString);
		}
	}

	/**
	 * Toggles the selection state of a filter
	 * @param filter The filter to toggle
	 * @param group
	 */
	public toggleFilter (filter: CuiFilter, group: CuiFilterGroup) {
		filter.toggleSelected(group);
		this.updateSelectedFilters();
		this.emitSelectedFilters();
		this.cdr.detectChanges();
	}

	/**
	 * Clears selection of a single filter group
	 * @param group The group to clear
	 */
	public clearFilters (group: CuiFilterGroup) {
		group.clearFilters();
		this.updateSelectedFilters();
		this.emitSelectedFilters();
	}

	/**
	 * Clears selection of all filter groups
	 */
	public clearAllFilters () {
		for (const group of this.options.filters) {
			group.clearFilters();
		}
		this.updateSelectedFilters();
		this.emitSelectedFilters();
	}

	onDropdownChanged (group: CuiFilterGroup) {
		// set selected field on all filters
		_.each(group.items, item => {
			item.setSelected(false, group);
			_.each(group.selections, s => {
				if (item.value === s.value) {
					item.setSelected(true, group);
				}
			});
		});
		this.updateSelectedFilters();
		this.emitSelectedFilters();
		this.cdr.detectChanges();
	}
}
