var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, Inject, Optional, ViewChild, ViewEncapsulation, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BasePortalOutlet, CdkPortalOutlet, } from '@angular/cdk/portal';
import { FocusTrapFactory } from '@angular/cdk/a11y';
var CuiDialogComponent = (function (_super) {
    __extends(CuiDialogComponent, _super);
    function CuiDialogComponent(_elementRef, _focusTrapFactory, _changeDetectorRef, _document) {
        var _this = _super.call(this) || this;
        _this._elementRef = _elementRef;
        _this._focusTrapFactory = _focusTrapFactory;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._document = _document;
        _this._elementThatWasFocusedBeforeDialogOpened = null;
        return _this;
    }
    CuiDialogComponent.prototype.ngOnInit = function () {
        this._trapFocus();
    };
    CuiDialogComponent.prototype.ngOnDestroy = function () {
        this._restoreFocus();
    };
    /**
     * Attach TemplatePortal as content for dialog container
     * @param templatePortal
     * @returns EmbeddedViewRef
     */
    /**
         * Attach TemplatePortal as content for dialog container
         * @param templatePortal
         * @returns EmbeddedViewRef
         */
    CuiDialogComponent.prototype.attachTemplatePortal = /**
         * Attach TemplatePortal as content for dialog container
         * @param templatePortal
         * @returns EmbeddedViewRef
         */
    function (templatePortal) {
        return this._portalOutlet.attachTemplatePortal(templatePortal);
    };
    /**
     * Attach ComponentPortal as content for dialog container
     * @param componentPortal
     * @returns ComponentRef
     */
    /**
         * Attach ComponentPortal as content for dialog container
         * @param componentPortal
         * @returns ComponentRef
         */
    CuiDialogComponent.prototype.attachComponentPortal = /**
         * Attach ComponentPortal as content for dialog container
         * @param componentPortal
         * @returns ComponentRef
         */
    function (componentPortal) {
        return this._portalOutlet.attachComponentPortal(componentPortal);
    };
    /** Moves the focus inside the focus trap */
    /** Moves the focus inside the focus trap */
    CuiDialogComponent.prototype._trapFocus = /** Moves the focus inside the focus trap */
    function () {
        if (!this._cuiDialogFocusTrap) {
            this._cuiDialogFocusTrap =
                this._focusTrapFactory.create(this._elementRef.nativeElement);
        }
        // wait for change detection to run first, just in case, before attempting to focus
        if (this._cuiDialogConfig.autoFocus) {
            this._cuiDialogFocusTrap.focusInitialElementWhenReady();
        }
    };
    /** Restore focus to the element which had focus before dialog opened */
    /** Restore focus to the element which had focus before dialog opened */
    CuiDialogComponent.prototype._restoreFocus = /** Restore focus to the element which had focus before dialog opened */
    function () {
        var elementToFocus = this._elementThatWasFocusedBeforeDialogOpened;
        // extra check for IE `activeElement`
        if (elementToFocus && typeof elementToFocus.focus === 'function') {
            elementToFocus.focus();
        }
        if (this._cuiDialogFocusTrap) {
            this._cuiDialogFocusTrap.destroy();
        }
    };
    CuiDialogComponent.prototype._savePreviouslyFocusedElement = function () {
        var _this = this;
        if (this._document) {
            this._elementThatWasFocusedBeforeDialogOpened
                = this._document.activeElement;
            Promise.resolve().then(function () { return _this._elementRef.nativeElement.focus(); });
        }
    };
    CuiDialogComponent.decorators = [
        { type: Component, args: [{ selector: 'cui-dialog-container',
                    template: "\n\t\t<div\n\t\t\tclass=\"modal__dialog\"\n\t\t\t[style.width]=\"_cuiDialogConfig.width\"\n\t\t\t[style.max-width]=\"_cuiDialogConfig.maxWidth\"\n\t\t\t[style.min-width]=\"_cuiDialogConfig.minWidth\"\n\t\t \t[style.height]=\"_cuiDialogConfig.height\"\n\t\t\t[style.max-height]=\"_cuiDialogConfig.maxHeight\"\n\t\t\t[style.min-height]=\"_cuiDialogConfig.minHeight\"\n\t\t>\n\t\t\t<ng-template cdkPortalOutlet></ng-template>\n\t\t</div>\n\t",
                    styles: [".modal-backdrop, .cdk-overlay-backdrop { position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: #c4c7cc; opacity: 0.65; pointer-events: none; transition: opacity 0.3s ease; z-index: 1040; } .modal { position: fixed; top: 0; right: 0; bottom: 0; left: 0; overflow-x: hidden; overflow-y: auto; -webkit-overflow-scrolling: touch; pointer-events: none; z-index: 1050; pointer-events: auto; } .modal--animated { animation: blowup 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards, fade-in 0.25s 1 linear; } .modal.show .modal__dialog, .modal.show .modal-dialog { opacity: 1; } .modal.fade .modal__dialog, .modal.fade .modal-dialog { transform: scale3d(1, 1, 1); } .modal .modal__dialog, .modal .modal-dialog { width: 100%; max-width: 700px; margin: auto; padding: 20px; } @media (max-width: 767px) { .modal .modal__dialog, .modal .modal-dialog { padding: 0; } } .modal .modal__content, .modal .modal-content { position: relative; display: block; text-align: center; padding: 60px 40px; background-color: #ffffff; color: #58585b; border-radius: 2px; border: 0 none; box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.25); } @media (max-width: 767px) { .modal .modal__content, .modal .modal-content { padding: 20px; } } .modal .modal__content .modal__close, .modal .modal-content .modal__close { font-size: 34px; line-height: 34px; position: absolute; right: 20px; top: 20px; color: #9e9ea2; } .modal .modal__content .modal__close:hover, .modal .modal-content .modal__close:hover { color: #0377A1; } .modal .modal__content .modal__header, .modal .modal-content .modal__header { margin-bottom: 30px; } .modal .modal__content .modal__header .modal__title, .modal .modal-content .modal__header .modal__title { font-size: 48px; font-weight: 100; } @media (max-width: 767px) { .modal .modal__content .modal__header .modal__title, .modal .modal-content .modal__header .modal__title { font-size: 32px; } } .modal .modal__content .modal__footer, .modal .modal-content .modal__footer { margin-top: 40px; } span[cui-dialog-close].icon-close { font-size: 34px; line-height: 34px; position: absolute; right: 20px; top: 20px; color: #9e9ea2; cursor: pointer; } span[cui-dialog-close].icon-close:hover { color: #0377A1; } /** * Overrides for @angular/cdk/overlay classes */ .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; pointer-events: auto; opacity: 0; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.65; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1050; } "],
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.Default,
                    host: {
                        tabIndex: '-1',
                        '[attr.role]': '_cuiDialogConfig?.role',
                        '[class]': '_cuiDialogConfig?.hostClass',
                    },
                },] },
    ];
    /** @nocollapse */
    CuiDialogComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: FocusTrapFactory, },
        { type: ChangeDetectorRef, },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] },] },
    ]; };
    CuiDialogComponent.propDecorators = {
        "_portalOutlet": [{ type: ViewChild, args: [CdkPortalOutlet,] },],
    };
    return CuiDialogComponent;
}(BasePortalOutlet));
export { CuiDialogComponent };
//# sourceMappingURL=cui-dialog.component.js.map