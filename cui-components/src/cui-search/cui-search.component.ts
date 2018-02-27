import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Guid } from '@cisco-ngx/cui-utils';
import { invoke } from 'lodash-es';

import 'rxjs/add/operator/debounceTime';

@Component({
	selector: 'cui-search',
	templateUrl: './cui-search.component.html',
	styleUrls: ['./cui-search.component.scss'],
})
/**
 * Component for a search input
 */
export class CuiSearchComponent implements OnInit, OnDestroy {
	/**
	 * Optional placeholder text for the input
	 */
	@Input() placeholder = '';
	/**
	 * The text entered into the input
	 */
	@Input() searchText = '';
	/**
	 * Debounce time in milliseconds
	 */
	@Input() debounce = 300;

	/**
	 * Event emitted when search text is changed
	 */
	@Output() onUpdate: EventEmitter<string> = new EventEmitter();

	searchTextChanged: Subject<string> = new Subject<string>();
	guid: string = Guid.generate();

	private querySubscribe: any;

	constructor (private activatedRoute: ActivatedRoute) { }

	ngOnInit () {
		this.querySubscribe = this.activatedRoute.queryParams.subscribe((params: Params) => {
			this.setSearchFromQuery(params);
		});

		this.searchTextChanged
			.debounceTime(this.debounce)
			.subscribe(model => {
				this.searchText = model;
				this.onUpdate.emit(this.searchText);
			});
	}

	ngOnDestroy () {
		invoke(this, 'querySubscribe.unsubscribe');
	}

	private setSearchFromQuery (params: Params) {
		if (params.search) {
			this.searchText = params.search;
		}
	}

	/**
	 * Clears text in the input
	 */
	clearSearchText () {
		this.searchText = '';
		this.onUpdate.emit(this.searchText);
	}

	onSearchTextChange (text: string) {
		this.searchTextChanged.next(text);
	}
}
