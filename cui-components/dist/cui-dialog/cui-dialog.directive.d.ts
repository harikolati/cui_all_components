import { OnChanges, SimpleChanges } from '@angular/core';
import { CuiDialogRef } from './cui-dialog-ref';
import { CuiDialogComponent } from './cui-dialog.component';
/**
 * Button to close the dialog
 */
export declare class CuiDialogClose implements OnChanges {
    cuiDialogRef: CuiDialogRef<any>;
    ariaLabel: string;
    /** input from dialog */
    cuiDialogResult: any;
    _cuiDialogClose: any;
    constructor(cuiDialogRef: CuiDialogRef<any>);
    ngOnChanges(changes: SimpleChanges): void;
}
/**
 * Contains the dialog title in the header section
 */
export declare class CuiDialogTitle {
    private _cuiDialogComponent;
    id: string;
    constructor(_cuiDialogComponent: CuiDialogComponent);
}
/**
 * Contains the scrollable dialog content
 */
export declare class CuiDialogContent {
}
/**
 * Contains the footer elements in the dialog
 */
export declare class CuiDialogActions {
}
