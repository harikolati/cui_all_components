import { OverlayRef } from '@angular/cdk/overlay';
import { Observable } from 'rxjs/Observable';
import { CuiDialogComponent } from './cui-dialog.component';
export declare class CuiDialogRef<T, R = any> {
    private _overlayRef;
    private _cuiDialogComponentInstance;
    readonly id: string;
    componentInstanceToOpen: T;
    private _afterCuiDialogOpened;
    private _afterCuiDialogClosed;
    private _cuiDialogResult;
    constructor(_overlayRef: OverlayRef, _cuiDialogComponentInstance: CuiDialogComponent, id?: string);
    /**
     * Close the dialog.
     * @param cuiDialogResult Optional result to return to the dialog opener.
     * @returns   nothing
     */
    close(cuiDialogResult?: R): void;
    /**
     * Updates the dialog's position.
     */
    updatePosition(): this;
    /** Fetches the position strategy object from the overlay ref. */
    private _getPositionStrategy();
    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    updateSize(width?: string, height?: string): this;
    afterCuiDialogOpened(): Observable<MouseEvent | void>;
    afterCuiDialogClosed(): Observable<R | undefined>;
    backdropClick(): Observable<MouseEvent | void>;
    keydownEvents(): Observable<KeyboardEvent>;
}
