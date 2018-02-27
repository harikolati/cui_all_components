import { OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
export declare class CuiPagerComponent implements OnInit, OnChanges {
    /**
     * The current page index.
     */
    page: number;
    /**
     * The number of items displayed per page.
     */
    limit: number;
    /**
     * The total number of items in the collection.
     */
    totalItems: number;
    /**
     * Event emitted when the page is changed.
     */
    onPageChanged: EventEmitter<Number>;
    lastPage: number;
    pageDetails: string;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    gotoPage(page: any): void;
    refreshPageDetails(): void;
}
