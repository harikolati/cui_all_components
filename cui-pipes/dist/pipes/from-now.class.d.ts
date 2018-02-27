import { NgZone, ChangeDetectorRef } from '@angular/core';
export declare class FromNow {
    private changeDetectorRef;
    private ngZone;
    private timer;
    constructor(changeDetectorRef: ChangeDetectorRef, ngZone: NgZone);
    generate(value: any): string;
    removeTimer(): void;
    private getSecondsUntilUpdate(seconds);
}
