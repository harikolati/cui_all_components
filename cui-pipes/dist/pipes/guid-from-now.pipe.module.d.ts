/**
 * @angular
 */
import { PipeTransform, ChangeDetectorRef, NgZone } from '@angular/core';
import { FromNow } from './from-now.class';
export declare class GuidFromNowPipe implements PipeTransform {
    private changeDetectorRef;
    private ngZone;
    fromNow: FromNow;
    constructor(changeDetectorRef?: ChangeDetectorRef, ngZone?: NgZone);
    /**
     * Retrieves the time from now that a MongoDB object was created
     * @param   value The _id property from the Mongo object
     * @returns The time from now
     */
    transform(value: string): string;
    ngOnDestroy(): void;
}
export declare class GuidFromNowPipeModule {
}
