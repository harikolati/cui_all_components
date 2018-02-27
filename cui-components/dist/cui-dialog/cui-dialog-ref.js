import { Subject } from 'rxjs/Subject';
import { Guid } from '@cisco-ngx/cui-utils';
var CuiDialogRef = (function () {
    function CuiDialogRef(_overlayRef, _cuiDialogComponentInstance, id) {
        if (id === void 0) { id = "cui-dialog-" + Guid.generate(); }
        this._overlayRef = _overlayRef;
        this._cuiDialogComponentInstance = _cuiDialogComponentInstance;
        this.id = id;
        this._afterCuiDialogOpened = new Subject();
        this._afterCuiDialogClosed = new Subject();
        this._afterCuiDialogOpened.next();
        this._afterCuiDialogOpened.complete();
    }
    /**
     * Close the dialog.
     * @param cuiDialogResult Optional result to return to the dialog opener.
     * @returns   nothing
     */
    /**
         * Close the dialog.
         * @param cuiDialogResult Optional result to return to the dialog opener.
         * @returns   nothing
         */
    CuiDialogRef.prototype.close = /**
         * Close the dialog.
         * @param cuiDialogResult Optional result to return to the dialog opener.
         * @returns   nothing
         */
    function (cuiDialogResult) {
        this._cuiDialogResult = cuiDialogResult;
        this._overlayRef.detachBackdrop();
        this._overlayRef.dispose();
        this._afterCuiDialogClosed.next(this._cuiDialogResult);
        this._afterCuiDialogClosed.complete();
        this._cuiDialogComponentInstance = null;
        this.componentInstanceToOpen = null;
    };
    /**
     * Updates the dialog's position.
     */
    /**
         * Updates the dialog's position.
         */
    CuiDialogRef.prototype.updatePosition = /**
         * Updates the dialog's position.
         */
    function () {
        var strategy = this._getPositionStrategy();
        if (strategy) {
            strategy.centerHorizontally();
            strategy.centerVertically();
        }
        this._overlayRef.updatePosition();
        return this;
    };
    /** Fetches the position strategy object from the overlay ref. */
    /** Fetches the position strategy object from the overlay ref. */
    CuiDialogRef.prototype._getPositionStrategy = /** Fetches the position strategy object from the overlay ref. */
    function () {
        return this._overlayRef.getConfig().positionStrategy;
    };
    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    /**
         * Updates the dialog's width and height.
         * @param width New width of the dialog.
         * @param height New height of the dialog.
         */
    CuiDialogRef.prototype.updateSize = /**
         * Updates the dialog's width and height.
         * @param width New width of the dialog.
         * @param height New height of the dialog.
         */
    function (width, height) {
        if (width === void 0) { width = 'auto'; }
        if (height === void 0) { height = 'auto'; }
        this._getPositionStrategy().width(width).height(height);
        this._overlayRef.updatePosition();
        return this;
    };
    CuiDialogRef.prototype.afterCuiDialogOpened = function () {
        return this._afterCuiDialogOpened.asObservable();
    };
    CuiDialogRef.prototype.afterCuiDialogClosed = function () {
        return this._afterCuiDialogClosed.asObservable();
    };
    CuiDialogRef.prototype.backdropClick = function () {
        return this._overlayRef.backdropClick();
    };
    CuiDialogRef.prototype.keydownEvents = function () {
        return this._overlayRef.keydownEvents();
    };
    return CuiDialogRef;
}());
export { CuiDialogRef };
//# sourceMappingURL=cui-dialog-ref.js.map