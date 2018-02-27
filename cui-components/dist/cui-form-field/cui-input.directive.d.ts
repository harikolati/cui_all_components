import { AfterContentChecked, ElementRef, EventEmitter, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
export declare class CuiInputDirective implements OnChanges, OnInit, AfterContentChecked {
    private elementRef;
    private renderer;
    controlContainer: ControlContainer;
    required: boolean;
    disabled: boolean;
    placeholder: string;
    id: string;
    readonly: string;
    maxlength: number;
    maxHeight: number;
    ngModel: string;
    formControl: AbstractControl;
    formControlName: string;
    control: AbstractControl;
    onChanges: EventEmitter<CuiInputDirective>;
    constructor(elementRef: ElementRef, renderer: Renderer2, controlContainer: ControlContainer);
    focusChanged(): void;
    onInput(): void;
    ngOnInit(): void;
    refreshForm(): void;
    ngOnChanges(): void;
    ngAfterContentChecked(): void;
    adjust(): void;
}
