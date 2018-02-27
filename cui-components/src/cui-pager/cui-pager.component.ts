import {
	Component,
	Input,
	OnInit,
	Output,
	EventEmitter,
	OnChanges,
	SimpleChanges
} from '@angular/core';

@Component({
	selector: 'cui-pager',
	templateUrl: './cui-pager.component.html',
	styleUrls: ['./cui-pager.component.scss'],
})
export class CuiPagerComponent implements OnInit, OnChanges {
	/**
	 * The current page index.
	 */
	@Input() page = 0;
	/**
	 * The number of items displayed per page.
	 */
	@Input() limit: number;
	/**
	 * The total number of items in the collection.
	 */
	@Input() totalItems: number;

	/**
	 * Event emitted when the page is changed.
	 */
	@Output() onPageChanged: EventEmitter<Number> = new EventEmitter();
	lastPage: number;
	pageDetails: string;

	ngOnInit () {
		this.lastPage =	Math.ceil(this.totalItems / this.limit) - 1;
		this.refreshPageDetails();
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes.totalItems || changes.limit) {
			this.lastPage =	Math.ceil(this.totalItems / this.limit) - 1;
			this.refreshPageDetails();
		}
	}

	gotoPage (page: any) {
		this.page = page;
		this.onPageChanged.emit(this.page);
		this.refreshPageDetails();
	}

	refreshPageDetails (): void {
		/* tslint:disable-next-line max-line-length ter-max-len */
		this.pageDetails = `${this.page * this.limit + 1}-${Math.min(this.page * this.limit + this.limit, this.totalItems)} of ${this.totalItems}`;
	}
}
