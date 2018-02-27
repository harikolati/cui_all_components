import { Directive, Input, Optional } from '@angular/core';
import { Guid } from '@cisco-ngx/cui-utils';
import { CuiDialogRef } from './cui-dialog-ref';
import { CuiDialogComponent } from './cui-dialog.component';
/**
 * Button to close the dialog
 */
var CuiDialogClose = (function () {
    function CuiDialogClose(cuiDialogRef) {
        this.cuiDialogRef = cuiDialogRef;
        this.ariaLabel = 'Close dialog';
    }
    CuiDialogClose.prototype.ngOnChanges = function (changes) {
        var proxiedChange = changes._cuiDialogClose || changes._cuiDialogCloseResult;
        if (proxiedChange) {
            this.cuiDialogResult = proxiedChange.currentValue;
        }
    };
    CuiDialogClose.decorators = [
        { type: Directive, args: [{
                    selector: "\n    button[cui-dialog-close],\n    span[cui-dialog-close],\n    span[cuiDialogClose],\n    button[cuiDialogClose]\n  ",
                    exportAs: 'cuiDialogClose',
                    host: {
                        '(click)': 'cuiDialogRef.close(cuiDialogResult)',
                        '[attr.aria-label]': 'ariaLabel',
                        type: 'button',
                    },
                },] },
    ];
    /** @nocollapse */
    CuiDialogClose.ctorParameters = function () { return [
        { type: CuiDialogRef, },
    ]; };
    CuiDialogClose.propDecorators = {
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
        "cuiDialogResult": [{ type: Input, args: ['cui-dialog-close',] },],
        "_cuiDialogClose": [{ type: Input, args: ['cuiDialogClose',] },],
    };
    return CuiDialogClose;
}());
export { CuiDialogClose };
/**
 * Contains the dialog title in the header section
 */
var CuiDialogTitle = (function () {
    function CuiDialogTitle(_cuiDialogComponent) {
        this._cuiDialogComponent = _cuiDialogComponent;
        /*
               * GUID for the title's id attribute
               */
        this.id = "cui-dialog-title-" + Guid.generate();
    }
    CuiDialogTitle.decorators = [
        { type: Directive, args: [{
                    selector: "[cui-dialog-title], [cuiDialogTitle]",
                    exportAs: 'cuiDialogTitle',
                    host: {
                        class: 'cui-dialog-title',
                        '[id]': 'id',
                    },
                },] },
    ];
    /** @nocollapse */
    CuiDialogTitle.ctorParameters = function () { return [
        { type: CuiDialogComponent, decorators: [{ type: Optional },] },
    ]; };
    CuiDialogTitle.propDecorators = {
        "id": [{ type: Input },],
    };
    return CuiDialogTitle;
}());
export { CuiDialogTitle };
/**
 * Contains the scrollable dialog content
 */
var CuiDialogContent = (function () {
    function CuiDialogContent() {
    }
    CuiDialogContent.decorators = [
        { type: Directive, args: [{
                    selector: "[cui-dialog-content], cui-dialog-content, [cuiDialogContent]",
                    host: {
                        class: 'cui-dialog-content',
                    },
                },] },
    ];
    /** @nocollapse */
    CuiDialogContent.ctorParameters = function () { return []; };
    return CuiDialogContent;
}());
export { CuiDialogContent };
/**
 * Contains the footer elements in the dialog
 */
var CuiDialogActions = (function () {
    function CuiDialogActions() {
    }
    CuiDialogActions.decorators = [
        { type: Directive, args: [{
                    selector: "[cui-dialog-actions], cui-dialog-actions, [cuiDialogActions]",
                    host: {
                        class: 'cui-dialog-actions',
                    },
                },] },
    ];
    /** @nocollapse */
    CuiDialogActions.ctorParameters = function () { return []; };
    return CuiDialogActions;
}());
export { CuiDialogActions };
//# sourceMappingURL=cui-dialog.directive.js.map