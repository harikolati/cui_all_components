import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CuiTableOptions } from './cui-table-options';
import { CuiTableColumnOption } from './cui-table-column-option';
import { StaticPagerService } from '@cisco-ngx/cui-services';

@Component({
	selector: 'cui-table',
	templateUrl: './cui-table.component.html',
	providers: [StaticPagerService],
})
/**
 * Component for a table
 */
export class CuiTableComponent implements OnInit {
	/**
	 * The table options object
	 */
	@Input() options: CuiTableOptions;
	/**
	 * The data to populate the table with
	 */
	@Input() data: any[];
	/**
	 * (optional) Number of items per page
	 */
	@Input() limit = 0;
	/**
	 * (optional) The current page index
	 */
	@Input() offset = 0;
	/**
	 * Whether all items in the table are selected
	 */
	@Input() allSelected = false;

	/**
	 * Event emitted when the sorting has changed
	 */
	@Output() onSortingChanged: EventEmitter<CuiTableColumnOption> = new EventEmitter();

	/**
	 * Event emitted when the items selected has changed
	 */
	@Output() onSelectionChanged: EventEmitter<any[]> = new EventEmitter();

	/**
	 * Event emitted when the table click view  happens
	 */
	@Output() onTableRowClicked: EventEmitter<any[]> = new EventEmitter();

	constructor(public staticPagerService: StaticPagerService) {}

	ngOnInit () {
		for (const column of this.options.columns) {
			if (column.sorting && !this.options.dynamicData) {
				column.sortDirection = 'desc';
				this.sortTable(column);
			}
		}
	}

	/**
	 * Toggles selection of all items
	 */
	toggleAllSelected () {
		this.allSelected = !this.allSelected;
		for (const item of this.data) {
			item['tableSelected'] = this.allSelected;
		}

		this.onSelectionChanged.emit(this.getSelectedItems());
	}

	/**
	 * Sorts the table by a column
	 * @param  {CuiTableColumnOption} sortColumn The column to sort by
	 */
	sortTable (sortColumn: CuiTableColumnOption) {
		if (!sortColumn.sortable) {
			return;
		}

		this.data = this.staticPagerService.sort(sortColumn, this.options.columns, this.data);
		this.onSortingChanged.emit(sortColumn);
	}

	onItemSelectedChange () {
		this.onSelectionChanged.emit(this.getSelectedItems());
		this.allSelected = this.data.filter(item =>
			item['tableSelected']).length === this.data.length;
	}

	getSelectedItems (): any[] {
		return this.data.filter(item => item['tableSelected']);
	}

	getDisplayedData (): any[] {
		if (!this.options.dynamicData) {
			return this.staticPagerService.getPagedData(this.data, this.offset, this.limit);
		}

		return this.data;
	}
}
