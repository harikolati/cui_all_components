import {
	Component,
	ComponentRef,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	ElementRef,
	EmbeddedViewRef,
	Inject,
	Optional,
	ViewChild,
	ViewEncapsulation,
	OnInit,
	OnDestroy,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';

import {
	BasePortalOutlet,
	CdkPortalOutlet,
	ComponentPortal,
	TemplatePortal,
} from '@angular/cdk/portal';

import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';

import { CuiDialogConfig } from './cui-dialog-config';

@Component({
	moduleId: module.id,
	selector: 'cui-dialog-container',
	template: `
		<div
			class="modal__dialog"
			[style.width]="_cuiDialogConfig.width"
			[style.max-width]="_cuiDialogConfig.maxWidth"
			[style.min-width]="_cuiDialogConfig.minWidth"
		 	[style.height]="_cuiDialogConfig.height"
			[style.max-height]="_cuiDialogConfig.maxHeight"
			[style.min-height]="_cuiDialogConfig.minHeight"
		>
			<ng-template cdkPortalOutlet></ng-template>
		</div>
	`,
	styleUrls: ['cui-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None,
	preserveWhitespaces: false,
	changeDetection: ChangeDetectionStrategy.Default,
	host: {
		tabIndex: '-1',
		'[attr.role]': '_cuiDialogConfig?.role',
		'[class]': '_cuiDialogConfig?.hostClass',
	},
})
export class CuiDialogComponent extends BasePortalOutlet implements OnInit, OnDestroy {
	/** Dialog content will be loaded here */
	@ViewChild(CdkPortalOutlet) _portalOutlet: CdkPortalOutlet;

	private _cuiDialogFocusTrap: FocusTrap;
	private _elementThatWasFocusedBeforeDialogOpened: HTMLElement | null = null;
	_cuiDialogConfig: CuiDialogConfig;

	constructor(
		private _elementRef: ElementRef,
		private _focusTrapFactory: FocusTrapFactory,
		private _changeDetectorRef: ChangeDetectorRef,
		@Optional() @Inject(DOCUMENT) private _document: any,
	) {
		super();
	}

	ngOnInit () {
		this._trapFocus();
	}

	ngOnDestroy () {
		this._restoreFocus();
	}

	/**
	 * Attach TemplatePortal as content for dialog container
	 * @param templatePortal
	 * @returns EmbeddedViewRef
	 */
	attachTemplatePortal<C> (templatePortal: TemplatePortal<C>): EmbeddedViewRef<C> {
		return this._portalOutlet.attachTemplatePortal(templatePortal);
	}

	/**
	 * Attach ComponentPortal as content for dialog container
	 * @param componentPortal
	 * @returns ComponentRef
	 */
	attachComponentPortal<T> (componentPortal: ComponentPortal<T>): ComponentRef<T> {
		return this._portalOutlet.attachComponentPortal(componentPortal);
	}

	/** Moves the focus inside the focus trap */
	private _trapFocus () {
		if (!this._cuiDialogFocusTrap) {
			this._cuiDialogFocusTrap =
				this._focusTrapFactory.create(this._elementRef.nativeElement);
		}

		// wait for change detection to run first, just in case, before attempting to focus
		if (this._cuiDialogConfig.autoFocus) {
			this._cuiDialogFocusTrap.focusInitialElementWhenReady();
		}
	}

	/** Restore focus to the element which had focus before dialog opened */
	private _restoreFocus () {
		const elementToFocus = this._elementThatWasFocusedBeforeDialogOpened;

		// extra check for IE `activeElement`
		if (elementToFocus && typeof elementToFocus.focus === 'function') {
			elementToFocus.focus();
		}

		if (this._cuiDialogFocusTrap) {
			this._cuiDialogFocusTrap.destroy();
		}
	}

	private _savePreviouslyFocusedElement () {
		if (this._document) {
			this._elementThatWasFocusedBeforeDialogOpened
				= <HTMLElement>this._document.activeElement;

			Promise.resolve().then(() => this._elementRef.nativeElement.focus());
		}
	}
}
