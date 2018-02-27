import { AfterContentInit, OnDestroy } from '@angular/core';
import { CuiInputDirective } from './cui-input.directive';
import { Subscription } from 'rxjs/Subscription';
export declare class CuiFormFieldComponent implements AfterContentInit, OnDestroy {
    input: CuiInputDirective;
    label: string;
    maxlength: number;
    required: boolean;
    model: string;
    changesSub: Subscription;
    statusChangeSub: Subscription;
    hasError: boolean;
    constructor();
    ngAfterContentInit(): void;
    initFormSubs(): void;
    refresh(input?: CuiInputDirective): void;
    onStatusChange(change: string): void;
    setError(valid: boolean): void;
    ngOnDestroy(): void;
}
