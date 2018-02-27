import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
export declare class CuiSearchComponent implements OnInit, OnDestroy {
    private activatedRoute;
    /**
     * Optional placeholder text for the input
     */
    placeholder: string;
    /**
     * The text entered into the input
     */
    searchText: string;
    /**
     * Debounce time in milliseconds
     */
    debounce: number;
    /**
     * Event emitted when search text is changed
     */
    onUpdate: EventEmitter<string>;
    searchTextChanged: Subject<string>;
    guid: string;
    private querySubscribe;
    constructor(activatedRoute: ActivatedRoute);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private setSearchFromQuery(params);
    /**
     * Clears text in the input
     */
    clearSearchText(): void;
    onSearchTextChange(text: string): void;
}
