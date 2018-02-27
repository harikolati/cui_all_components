import { ViewContainerRef } from '@angular/core';

/** ARIA roles */
export type CuiDialogRole = 'dialog' | 'alertDialog';

/** Configuration for dialog */
export class CuiDialogConfig<D = any> {
	viewContainerRef?: ViewContainerRef;
	id?: string;
	role?: CuiDialogRole = 'dialog';
	hasBackdrop? = true;
	width?: number | string;
	minWidth?: number | string;
	maxWidth?: number | string = '700px';
	height?: number | string;
	minHeight?: number | string;
	maxHeight?: number | string;
	data?: D | null = null;
	autoFocus? = true;
	animated? = false;
	hostClass? = 'modal';
}
