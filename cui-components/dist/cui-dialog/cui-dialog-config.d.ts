import { ViewContainerRef } from '@angular/core';
/** ARIA roles */
export declare type CuiDialogRole = 'dialog' | 'alertDialog';
/** Configuration for dialog */
export declare class CuiDialogConfig<D = any> {
    viewContainerRef?: ViewContainerRef;
    id?: string;
    role?: CuiDialogRole;
    hasBackdrop?: boolean;
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
    data?: D | null;
    autoFocus?: boolean;
    animated?: boolean;
    hostClass?: string;
}
