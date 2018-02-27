import { ComponentRef, ChangeDetectorRef, ElementRef, EmbeddedViewRef, OnInit, OnDestroy } from '@angular/core';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
import { CuiDialogConfig } from './cui-dialog-config';
export declare class CuiDialogComponent extends BasePortalOutlet implements OnInit, OnDestroy {
    private _elementRef;
    private _focusTrapFactory;
    private _changeDetectorRef;
    private _document;
    /** Dialog content will be loaded here */
    _portalOutlet: CdkPortalOutlet;
    private _cuiDialogFocusTrap;
    private _elementThatWasFocusedBeforeDialogOpened;
    _cuiDialogConfig: CuiDialogConfig;
    constructor(_elementRef: ElementRef, _focusTrapFactory: FocusTrapFactory, _changeDetectorRef: ChangeDetectorRef, _document: any);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Attach TemplatePortal as content for dialog container
     * @param templatePortal
     * @returns EmbeddedViewRef
     */
    attachTemplatePortal<C>(templatePortal: TemplatePortal<C>): EmbeddedViewRef<C>;
    /**
     * Attach ComponentPortal as content for dialog container
     * @param componentPortal
     * @returns ComponentRef
     */
    attachComponentPortal<T>(componentPortal: ComponentPortal<T>): ComponentRef<T>;
    /** Moves the focus inside the focus trap */
    private _trapFocus();
    /** Restore focus to the element which had focus before dialog opened */
    private _restoreFocus();
    private _savePreviouslyFocusedElement();
}
