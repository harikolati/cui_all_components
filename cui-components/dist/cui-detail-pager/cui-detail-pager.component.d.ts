import { OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
export declare class CuiDetailPagerComponent implements OnInit {
    private router;
    private location;
    options: any;
    constructor(router: Router, location: Location);
    private pages;
    private views;
    view: any;
    status: any;
    private handleKeyboardEvent(event);
    hoverPrev(): String;
    hoverNext(): String;
    previousView(): void;
    nextView(): void;
    private loadView();
    private fetchPage();
    private fetchData(opt?);
    private loadData(opt?);
    ngOnInit(): void;
}
