import { PipeTransform, NgZone, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FromNow } from './from-now.class';
export declare class FromNowPipe implements PipeTransform, OnDestroy {
    private changeDetectorRef;
    private ngZone;
    fromNow: FromNow;
    constructor(changeDetectorRef?: ChangeDetectorRef, ngZone?: NgZone);
    transform(value: any, unix?: boolean): string;
    ngOnDestroy(): void;
}
export declare class FromNowPipeModule {
}
