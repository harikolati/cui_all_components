import { ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
export declare class CuiSelectPaginatorDirective implements OnChanges {
    private el;
    private renderer;
    scroll: {
        start: number;
        size: number;
    };
    readonly start: number;
    readonly size: number;
    lastScrollTop: 0;
    fullDataset: any[];
    dropdownPaginator: boolean;
    onScroll(): void;
    paginateUp(): void;
    paginateDown(): void;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
}
