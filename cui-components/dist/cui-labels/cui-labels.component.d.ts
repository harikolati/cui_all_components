import { OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class CuiLabelsComponent implements OnInit, OnChanges, ControlValueAccessor {
    removable: boolean;
    raised: boolean;
    bordered: boolean;
    size: string;
    color: string;
    labelKey: string;
    data: any[];
    labelClasses: any;
    propagateChange: Function;
    constructor();
    remove(index: number): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(): void;
}
