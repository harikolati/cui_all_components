import { AfterViewInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CuiInputOptions } from './cui-input-options';
/**
 * Component for a form input using CiscoUI
 */
export declare class CuiInputComponent implements AfterViewInit, ControlValueAccessor {
    /**
     * The value recorded in the input
     * @Deprecated use ngModel
     */
    model: any;
    /**
     * The type of input (text, textarea, number, switch,
     * email, password, tel, date, month, week, time)
     */
    type: string;
    /**
     * The label to display next to the input
     */
    label: string;
    /**
     * Optional validation options
     */
    options: CuiInputOptions;
    /**
     * Available choices for a radio input or checkboxes (name, value)
     */
    items: any[];
    /**
     * Event emitted when the input's value is changed
     * @Deprecated use ngModelChange
     */
    modelChange: EventEmitter<any>;
    /**
     * GUID for the input's id attribute
     */
    guid: string;
    error: number;
    errorMessage: string;
    maxLengthString: string;
    inputElement: any;
    propagateChange: Function;
    writeValue(value: any): void;
    registerOnChange(fn: Function): void;
    registerOnTouched(): void;
    ngAfterViewInit(): void;
    /**
     * Internal onChange function for the input
     */
    onChange(): void;
    hasError(error: number): number;
    getErrorMessage(): any;
}
