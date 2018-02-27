import { OnInit, OnChanges, ElementRef } from '@angular/core';
export declare class CuiDropdownComponent implements OnInit, OnChanges {
    private elementRef;
    /**
     * The percent to show in the gauge
     */
    label: string;
    /**
     * The type of button (default, primary, secondary, white, negative, success)
     */
    type: string;
    /**
     * Whether the button is small
     */
    small: boolean;
    /**
     * Whether the button is wide
     */
    wide: boolean;
    /**
     * Optional alternate value to show in the center of the gauge
     */
    actions: any[];
    active: boolean;
    colorClass: string;
    sizeClass: string;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(): void;
    doBlur(event: MouseEvent): void;
    private setClassStrings();
    private formatActions();
}
