import { Directive, Input, OnChanges, Optional, SimpleChanges } from '@angular/core';

import { Guid } from '@cisco-ngx/cui-utils';

import { CuiDialogRef } from './cui-dialog-ref';
import { CuiDialogComponent } from './cui-dialog.component';

/**
 * Button to close the dialog
 */
@Directive({
	selector: `
    button[cui-dialog-close],
    span[cui-dialog-close],
    span[cuiDialogClose],
    button[cuiDialogClose]
  `,
	exportAs: 'cuiDialogClose',
	host: {
		'(click)': 'cuiDialogRef.close(cuiDialogResult)',
		'[attr.aria-label]': 'ariaLabel',
		type: 'button',  // IE fix to prevent submit
	},
})
export class CuiDialogClose implements OnChanges {
	@Input('aria-label') ariaLabel = 'Close dialog';
	/** input from dialog */
	@Input('cui-dialog-close') cuiDialogResult: any;
	@Input('cuiDialogClose') _cuiDialogClose: any;

	constructor(public cuiDialogRef: CuiDialogRef<any>) { }

	ngOnChanges (changes: SimpleChanges) {
		const proxiedChange = changes._cuiDialogClose || changes._cuiDialogCloseResult;

		if (proxiedChange) {
			this.cuiDialogResult = proxiedChange.currentValue;
		}
	}
}

/**
 * Contains the dialog title in the header section
 */
@Directive({
	selector: `[cui-dialog-title], [cuiDialogTitle]`,
	exportAs: 'cuiDialogTitle',
	host: {
		class: 'cui-dialog-title',
		'[id]': 'id',
	},
})
export class CuiDialogTitle {
	/*
	   * GUID for the title's id attribute
	   */
	@Input() id = `cui-dialog-title-${Guid.generate()}`;

	constructor(@Optional() private _cuiDialogComponent: CuiDialogComponent) { }
}

/**
 * Contains the scrollable dialog content
 */
@Directive({
	selector: `[cui-dialog-content], cui-dialog-content, [cuiDialogContent]`,
	host: {
		class: 'cui-dialog-content',
	},
})
export class CuiDialogContent { }

/**
 * Contains the footer elements in the dialog
 */
@Directive({
	selector: `[cui-dialog-actions], cui-dialog-actions, [cuiDialogActions]`,
	host: {
		class: 'cui-dialog-actions',
	},
})
export class CuiDialogActions { }
