import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, Validator } from '@angular/forms';
export declare class CuiChipsComponent implements AfterViewInit, ControlValueAccessor, Validator {
    private renderer;
    label: string;
    required: boolean;
    max: number;
    placeholder: string;
    allowDuplicates: boolean;
    inputRef: ElementRef;
    inputText: string;
    chips: string[];
    dupDisable: boolean;
    propagateChange: Function;
    constructor(renderer: Renderer2);
    registerOnTouched(): void;
    registerOnChange(fn: Function): void;
    writeValue(value: string[]): void;
    validate(): any;
    onAdd(): void;
    ngAfterViewInit(): void;
    onLabelsChange(): void;
    onInputTextChange(): void;
    checkValidity(): void;
    hasDups(): boolean;
}
