import { OnChanges, OnInit, ElementRef } from '@angular/core';
export declare class CuiButtonComponent implements OnChanges, OnInit {
    elem: HTMLElement;
    color: string;
    small: boolean;
    wide: boolean;
    icon: boolean;
    animated: boolean;
    class: string;
    clickFn: (e: any) => void;
    constructor(elementRef: ElementRef);
    setClass(): void;
    ngOnInit(): void;
    ngOnChanges(): void;
    getOffsetLeft(elem: HTMLElement): number;
    getOffsetTop(elem: HTMLElement): number;
}
